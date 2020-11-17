import {
	Controller,
	Get,
	Route,
	Tags
} from "tsoa"
import { Inject } from "typescript-ioc"
import {
	ICodec,
	IEncoder,
	IFFmpegCapabilities,
	IFilter,
	IFormat,
} from "~/service/ffmpeg/interface"
import { CapabilityService } from "../service/capabilities"
@Route("/capabilities")
@Tags("Capabilities")
export class CapabilityController extends Controller {
	@Inject
	private readonly capabilityService!: CapabilityService
	/**
	 * Returns a list of capabilities and options that 
	 * can be applied to an FFmpeg command.
	 */
	@Get("/")
	public async getAvailableCapabilities(): Promise<IFFmpegCapabilities> {
		return await this.capabilityService.getAllCapabilities()
	}
	/**
	 * Returns all available filters that can be used for conversion.
	 */
	@Get("/filter")
	public async getAvailableFilter(): Promise<IFilter[]> {
		return await this.capabilityService.getAvailableFilters()
	}
	/**
	 * Returns all available formats that can be converted with FFmpeg.
	 */
	@Get("/formats")
	public async getAvailableFormats(): Promise<IFormat[]> {
		return await this.capabilityService.getAvailableFormats()
	}
	
	@Get("/codecs")
	public async getAvailableCodecs(): Promise<ICodec[]> {
		return await this.capabilityService.getAvailableCodecs()
		// catch (error) {
		// 	return {
		// 		message: error.message,
		// 		status: error.code
		// 	}
		// }
	}
	/**
	 * Returns all available encoders FFmpeg is able to use.
	 */
	@Get("/encoders")
	public async getAvailableEncoders(): Promise<IEncoder[]> {
		return await this.capabilityService.getAvailableEncoders()
		// catch (error) {
		// 	return {
		// 		message: error.message,
		// 		status: error.code
		// 	}
		// }
	}
}