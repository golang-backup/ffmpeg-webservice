/* eslint-disable @typescript-eslint/no-floating-promises */
import { ConversionQueueService } from "./conversionQueue"
import { EConversionStatus } from "./enum"
import { FFmpegWrapper } from "../ffmpeg"
import {
	IConversionProcessingResponse,
	IConversionQueueStatus,
	IConversionRequest,
	IConversionRequestBody,
	IConversionStatus
} from "./interface"
import { IConversionResult } from "../ffmpeg/interface"
import { Inject } from "typescript-ioc"
import { Logger } from "../logger"
import { v4 as uuidV4 } from "uuid"
import { deleteFile, writeToFile } from "../file-io"
export class ConversionService {
	@Inject
	private readonly conversionQueueService!: ConversionQueueService
	@Inject
	private readonly ffmpeg!: FFmpegWrapper
	@Inject
	private readonly logger!: Logger
	public addToConversionQueue(requestObject: IConversionRequest): IConversionProcessingResponse {
		const {
			conversionId
		} = this.queueService.addToConversionQueue(requestObject)
		// eslint-disable-next-line no-void
		void this.update()
		return {
			conversionId
		}
	}
	async convertFile(): Promise<void> {
		const fileToProcess = this.queueService.getNextQueueElement()
		if (fileToProcess) {
			const {
				conversionId,
				name,
				path,
				sourceFormat,
				targetFormat
			} = fileToProcess
			this.queueService.isCurrentlyConverting = true
			this.queueService.currentlyConvertingFile = fileToProcess
			this.queueService.changeConvLogEntry(conversionId, EConversionStatus.processing)
			try {
				// Todo: Implement wrapper.
				const conversionResponse: IConversionResult = await this.ffmpeg
					.convertToTargetFormat(path, conversionId, sourceFormat, targetFormat)
				/* Delete input file. */
				await deleteFile(path)
				this.conversionQueueService.addToConvertedQueue(
					conversionId,
					{
						outputFilename: name,
						outputFilepath: conversionResponse.outputFilepath
					}
				)
				this.queueService.changeConvLogEntry(conversionId, EConversionStatus.converted)
			}
			catch (err) {
				this.logger.error(`Readding the file conversion request due to error before: ${err}`)
				this.queueService.addToConversionQueue(fileToProcess)
				this.queueService.changeConvLogEntry(conversionId, EConversionStatus.inQueue)
			}
			finally {
				// Todo: refactor/replace with function
				this.isCurrentlyConverting = false
				// eslint-disable-next-line no-void
				void this.update()
			}
		}
	}
	public getConversionQueueStatus(): IConversionQueueStatus {
		const conversions = this.queueService.conversionLog.map(
			item => {
				const queuePosition: number = this.queueService.conversionQueue.findIndex(
					element => element.conversionId === item.conversionId
				)
				if (item.status === EConversionStatus.inQueue) {
					return {
						...item,
						queuePosition
					}
				}
				return item
			}
		)
		return {
			conversions,
			remainingConversions: this.queueLength
		}
	}
	public getConvertedFile(fileId: string): IConversionStatus {
		return this.queueService.getStatusById(fileId)
	}
	public async processConversionRequest({
		file,
		filename,
		originalFormat,
		targetFormat
	}: IConversionRequestBody): Promise<IConversionProcessingResponse> {
		const conversionId = uuidV4()
		const inPath = `input/${conversionId}.${originalFormat}`
		await writeToFile(inPath, file)
		const request: IConversionRequest = {
			conversionId,
			isConverted: false,
			name: filename,
			path: inPath,
			sourceFormat: originalFormat,
			targetFormat
		}
		return this.addToConversionQueue(request)
	}
	private async update(): Promise<void> {
		if (!this.isCurrentlyConverting) {
			return await new Promise((resolve, reject) => {
				try {
					this.convertFile()
					resolve()
				}
				catch (err) {
					reject(err)
				}
			})
		}
		return undefined
	}
	get isCurrentlyConverting(): boolean {
		return this.queueService.isCurrentlyConverting
	}
	set isCurrentlyConverting(isConverting: boolean) {
		this.queueService.isCurrentlyConverting = isConverting
	}
	get queueService(): ConversionQueueService {
		return this.conversionQueueService
	}
	get queueLength(): number {
		return this.queueService.conversionQueue.length
	}
}