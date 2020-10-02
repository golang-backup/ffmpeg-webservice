/* eslint-disable @typescript-eslint/no-floating-promises */
import { ConversionQueueService } from "./conversionQueue"
import { EConversionStatus } from "./enum"
import {
	IConversionProcessingResponse,
	IConversionQueueStatus,
	IConversionRequest,
	IConversionRequestBody,
	IConversionStatus
} from "./interface"
import { Inject } from "typescript-ioc"
import { Logger } from "../logger"
// Import { UnoconvService } from "../unoconv"
import { v4 as uuidV4 } from "uuid"
import { writeToFile } from "../file-io"
export class ConversionService {
	@Inject
	private readonly conversionQueueService!: ConversionQueueService
	private readonly logger: Logger
	constructor() {
		this.conversionQueueService = new ConversionQueueService()
		this.logger = new Logger()
	}
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
	convertFile(): void {
		const fileToProcess = this.queueService.getNextQueueElement()
		if (fileToProcess) {
			const {
				conversionId,
				name,
				path,
				targetFormat
			} = fileToProcess
			this.queueService.isCurrentlyConverting = true
			this.queueService.currentlyConvertingFile = fileToProcess
			this.queueService.changeConvLogEntry(conversionId, EConversionStatus.processing)
			try {
				// Const resp = await UnoconvService.convertToTarget({
				// 	ConversionId,
				// 	FilePath: path,
				// 	OutputFilename: name,
				// 	TargetFormat
				// })
				// Await deleteFile(path)
				// This.conversionQueueService.addToConvertedQueue(
				// 	ConversionId,
				// 	Resp
				// )
				this.queueService.changeConvLogEntry(conversionId, EConversionStatus.converted)
			}
			catch (err) {
				this.logger.error(err)
			}
			finally {
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
		const inPath = `./input/${conversionId}.${originalFormat}`
		await writeToFile(inPath, file)
		const request: IConversionRequest = {
			conversionId,
			isConverted: false,
			name: filename,
			path: inPath,
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