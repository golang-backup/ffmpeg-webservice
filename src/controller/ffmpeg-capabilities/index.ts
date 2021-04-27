import { CapabilityService } from "../../service/capabilities"
import {
	Controller,
	Get,
	Route,
	Tags
} from "tsoa"
import {
	ICodec,
	IEncoder,
	IFFmpegCapabilities,
	IFilter,
	IFormat
} from "../../service/ffmpeg/interface"
import { Inject } from "typescript-ioc"
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
	@Get("/codecs")
	public async getAvailableCodecs(): Promise<ICodec[]> {
		return await this.capabilityService.getAvailableCodecs()
	}
	/**
	 * Returns all available encoders FFmpeg is able to use.
	 */
	@Get("/encoders")
	public async getAvailableEncoders(): Promise<IEncoder[]> {
		return await this.capabilityService.getAvailableEncoders()
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
}