import {
	Body, Controller, Get, Path, Post, Route, Tags
} from "tsoa"
import { ConversionService } from "../../service/conversion"
import { EHttpResponseCodes } from "../../constants"
import { IConversionQueueStatus } from "../../service/conversion/interface"
import { IConversionRequestBody } from "../../model"
@Route("/conversion")
@Tags("Conversion")
export class ConversionController extends Controller {
	/**
	 * Adds the file from the request body to the internal conversion queue.
	 * The files in queue will be processed after the FIFO principle.
	 * @param conversionRequestBody	contains the file to convert
	 */
	@Post("/")
	public async convertFile(
		@Body() conversionRequestBody: IConversionRequestBody
	): Promise<any> {
		this.setStatus(EHttpResponseCodes.internalServerError)
		return await ConversionService.convertFile(conversionRequestBody)
	}
	/**
	 * Retrieves the status of the conversion queue and returns all conversions with
	 * their corresponding status and the amount of outstanding conversions.
	 */
	@Get("")
	public getConversions(): IConversionQueueStatus {
		return new ConversionService().getConversionQueueStatus()
	}
	/**
	 * Returns the current status for a conversion given a conversionId
	 * @param fileId Unique identifier for the conversion of a file.
	 */
	@Get("{fileId}")
	public async getConvertedFile(@Path() fileId: string): Promise<any> {
		return await ConversionService.getConvertedFile(fileId)
	}
}