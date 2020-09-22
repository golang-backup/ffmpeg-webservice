import {
	Controller,
	Get,
	Route,
	Tags
} from "tsoa"
import { ConversionService } from "../service/conversion"
@Route("/")
@Tags("Conversion-Formats")
export class IndexController extends Controller {
	/**
	 * Returns a list of all possible formats to convert from and to.
	 */
	@Get("/formats")
	public async getSupportedFormats(): Promise<void> {
		return await new ConversionService().getSupportedFormats()
	}
}