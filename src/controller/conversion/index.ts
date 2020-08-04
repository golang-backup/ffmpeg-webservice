import {
	Body, Controller, Get, Path, Post, Route, Tags
} from "tsoa"
import { ConversionService } from "../../service/conversion"
import { IConversionRequestBody } from "../../model"
@Route("/conversion")
@Tags("Conversion")
export class ConversionController extends Controller {
	@Post("/")
	public async convertFile(
		@Body() conversionRequestBody: IConversionRequestBody
	): Promise<any> {
		this.setStatus(500)
		return await ConversionService.convertFile(conversionRequestBody)
	}
	@Get("{fileId}")
	public async getConvertedFile(@Path() fileId: string): Promise<any> {
		return await ConversionService.getConvertedFile(fileId)
	}
}