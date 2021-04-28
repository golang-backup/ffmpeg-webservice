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
<<<<<<< HEAD
=======
import { Logger } from "../../service/logger"
>>>>>>> 3311f9ba0d8997c76f9c6f972f43113bae3a6b84
@Route("/capabilities")
@Tags("Capabilities")
export class CapabilityController extends Controller {
	@Inject
	private readonly capabilityService!: CapabilityService
<<<<<<< HEAD
=======
	@Inject
	private readonly logger!: Logger
>>>>>>> 3311f9ba0d8997c76f9c6f972f43113bae3a6b84
	/**
	 * Returns a list of capabilities and options that
	 * can be applied to an FFmpeg command.
	 */
	@Get("/")
	public async getAvailableCapabilities(): Promise<IFFmpegCapabilities> {
<<<<<<< HEAD
=======
		this.logger.log(`Ffmpeg-Capabilities requested`)
>>>>>>> 3311f9ba0d8997c76f9c6f972f43113bae3a6b84
		return await this.capabilityService.getAllCapabilities()
	}
	@Get("/codecs")
	public async getAvailableCodecs(): Promise<ICodec[]> {
<<<<<<< HEAD
=======
		this.logger.log(`Ffmpeg-Codecs requested`)
>>>>>>> 3311f9ba0d8997c76f9c6f972f43113bae3a6b84
		return await this.capabilityService.getAvailableCodecs()
	}
	/**
	 * Returns all available encoders FFmpeg is able to use.
	 */
	@Get("/encoders")
	public async getAvailableEncoders(): Promise<IEncoder[]> {
<<<<<<< HEAD
=======
		this.logger.log(`Ffmpeg-Encoders requested`)
>>>>>>> 3311f9ba0d8997c76f9c6f972f43113bae3a6b84
		return await this.capabilityService.getAvailableEncoders()
	}
	/**
	 * Returns all available filters that can be used for conversion.
	 */
	@Get("/filter")
	public async getAvailableFilter(): Promise<IFilter[]> {
<<<<<<< HEAD
=======
		this.logger.log(`Ffmpeg-Filter requested`)
>>>>>>> 3311f9ba0d8997c76f9c6f972f43113bae3a6b84
		return await this.capabilityService.getAvailableFilters()
	}
	/**
	 * Returns all available formats that can be converted with FFmpeg.
	 */
	@Get("/formats")
	public async getAvailableFormats(): Promise<IFormat[]> {
<<<<<<< HEAD
=======
		this.logger.log(`Ffmpeg-Formats requested`)
>>>>>>> 3311f9ba0d8997c76f9c6f972f43113bae3a6b84
		return await this.capabilityService.getAvailableFormats()
	}
}