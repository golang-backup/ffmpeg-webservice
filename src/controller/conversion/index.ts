import {
	Body, Controller, Get, Path, Post, Route, Tags
} from "tsoa"
import { ConversionService } from "../../service/conversion"
import { EHttpResponseCodes } from "../../constants"
import {
	IConversionProcessingResponse,
	IConversionQueueStatus,
	IConversionStatus
} from "../../service/conversion/interface"
import { IConversionRequestBody } from "../../model"
import { Inject } from "typescript-ioc"
@Route("/conversion")
@Tags("Conversion")
export class ConversionController extends Controller {
	@Inject
	private readonly conversionService!: ConversionService
	/**
	 * Adds the file from the request body to the internal conversion queue.
	 * The files in queue will be processed after the FIFO principle.
	 * @param conversionRequestBody	contains the file to convert
	 */
	@Post("/")
	public async convertFile(
		@Body() conversionRequestBody: IConversionRequestBody
	): Promise<IConversionProcessingResponse> {
		this.setStatus(EHttpResponseCodes.internalServerError)
		return await this.conversionService.processConversionRequest(conversionRequestBody)
	}
	/**
	 * Retrieves the status of the conversion queue and returns all conversions with
	 * their corresponding status and the amount of outstanding conversions.
	 */
	@Get("/")
	public getConversions(): IConversionQueueStatus {
		return this.conversionService.getConversionQueueStatus()
	}
	/**
	 * Returns the current status for a conversion given a conversionId
	 * @param fileId Unique identifier for the conversion of a file.
	 */
	@Get("/{fileId}")
	public getConvertedFile(@Path() fileId: string): IConversionStatus {
		try {
			return this.conversionService.getConvertedFile(fileId)
		}
		catch (err) {
			this.setStatus(EHttpResponseCodes.notFound)
			return {
				conversionId: fileId,
				status: err.message
			}
		}
	}
}