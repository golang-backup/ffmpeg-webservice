import { EConversionStatus } from "./enum"
import {
	IConversionFinished,
	IConversionInProgress,
	IConversionInQueue,
	IConversionProcessingResponse,
	IConversionRequest,
	IConversionResult,
	IConversionStatus
} from "./interface"
import { IConvertedFile } from "../ffmpeg/interface"
import { NoSuchConversionIdError } from "../../constants"
import { readFileToBuffer } from "../file-io"
export class ConversionQueueService {
	private static instance: ConversionQueueService
	private readonly convLog!: IConversionStatus[]
	private readonly conversion!: IConversionRequest[]
	private readonly converted!: IConversionResult[]
	private currentlyConverting!: IConversionRequest | null
	private isConverting!: boolean
	constructor() {
		if (ConversionQueueService.instance) {
			return ConversionQueueService.instance
		}
		ConversionQueueService.instance = this
		this.convLog = []
		this.conversion = []
		this.converted = []
		this.currentlyConverting = null
		this.isConverting = false
		return this
	}
	public addToConversionQueue(requestObject: IConversionRequest): IConversionProcessingResponse {
		this.conversion.push(requestObject)
		this.convLog.push({
			conversionId: requestObject.conversionId,
			status: EConversionStatus.inQueue
		})
		return {
			conversionId: requestObject.conversionId
		}
	}
	public async addToConvertedQueue(
		conversionId: string,
		conversionResult: IConvertedFile
	): Promise<IConversionProcessingResponse> {
		const {
			outputFilename,
			outputFilepath
		} = conversionResult
		const resultFile = await readFileToBuffer(outputFilepath)
		this.converted.push({
			conversionId,
			name: outputFilename,
			path: outputFilepath,
			resultFile
		})
		this.currentlyConvertingFile = null
		return {
			conversionId
		}
	}
	public changeConvLogEntry(conversionId: string, status: EConversionStatus): void {
		const element = this.convLog.find(convElement => convElement.conversionId === conversionId)
		if (!element) {
			throw new NoSuchConversionIdError("No such conversion element")
		}
		element.status = status
	}
	public getNextQueueElement(): IConversionRequest | undefined {
		return this.conversionQueue.shift()
	}
	public getStatusById(conversionId: string): IConversionStatus {
		const isInConversionQueue: boolean = this.conversionQueue.filter(
			(item: IConversionRequest) => item.conversionId === conversionId
		).length > 0
		const isInConvertedQueue: boolean = this.convertedQueue.filter(
			(item: IConversionResult) => item.conversionId === conversionId
		).length > 0
		if (this.currentlyConvertingFile?.conversionId === conversionId) {
			return this.response(EConversionStatus.processing, conversionId)
		}
		if (isInConversionQueue) {
			return this.response(EConversionStatus.inQueue, conversionId)
		}
		if (isInConvertedQueue) {
			return this.response(EConversionStatus.converted, conversionId)
		}
		else {
			throw new NoSuchConversionIdError(`No conversion request found for given conversionId ${conversionId}`)
		}
	}
	public removeFromConvertedQueue(removee: IConversionResult): void {
		this.convertedQueue.splice(this.convertedQueue.indexOf(removee), 1)
	}
	private response(
		status: EConversionStatus,
		conversionId: string
	): IConversionInQueue | IConversionInProgress | IConversionFinished {
		if (status === EConversionStatus.inQueue) {
			// Add one to have 1-indexed queue
			const queuePosition: number = this.conversionQueue.findIndex(
				item => item.conversionId === conversionId
			) + 1
			const response: IConversionInQueue = {
				conversionId,
				queuePosition,
				status
			}
			return response
		}
		else if (status === EConversionStatus.converted) {
			const convertedFile = this.convertedQueue
				.filter(item => item.conversionId === conversionId)[0]
			const response: IConversionFinished = {
				conversionId,
				resultFile: convertedFile.resultFile,
				resultFilePath: convertedFile.path,
				status
			}
			return response
		}
		const response: IConversionInProgress = {
			conversionId,
			status
		}
		return response
	}
	get conversionLog(): IConversionStatus[] {
		return this.convLog
	}
	get conversionQueue(): IConversionRequest[] {
		return this.conversion
	}
	get convertedQueue(): IConversionResult[] {
		return this.converted
	}
	get currentlyConvertingFile(): IConversionRequest | null {
		return this.currentlyConverting
	}
	set currentlyConvertingFile(file: IConversionRequest | null) {
		this.currentlyConverting = file
	}
	get isCurrentlyConverting(): boolean {
		return this.isConverting
	}
	set isCurrentlyConverting(isNewConvertingVal: boolean) {
		this.isConverting = isNewConvertingVal
	}
}