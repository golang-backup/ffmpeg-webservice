import {
	Controller,
	Get,
	Route,
	Tags
} from "tsoa"
import { ConversionService } from "../service/conversion"
import { Inject } from "typescript-ioc"
@Route("/")
@Tags("Conversion-Formats")
export class IndexController extends Controller {
	@Inject
	private readonly conversionService!: ConversionService
	/**
	 * Returns a list of all possible formats to convert from and to.
	 */
	@Get("/formats")
	public async getSupportedFormats(): Promise<void> {
		// Return await conversionService.getSupportedFormats()
	}
}