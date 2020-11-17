import {
	ICodecData,
	IEncoderData,
	IFFmpegCapabilitiesObject,
	IFilterData,
	IFormatData,
	IOptions
} from "./interface"
import { Inject } from "typescript-ioc"
import { Logger } from "../logger"
import Ffmpeg, { FfmpegCommand } from "fluent-ffmpeg"
import path from "path"
export class FFmpegWrapper {
	@Inject
	private readonly logger!: Logger
	async convertToTargetFormat(
		inputFilePath: string,
		outputPath: string,
		targetFormat: string,
		options?: IOptions
	): Promise<unknown> {
		return await new Promise((resolve, reject) => {
			try {
				const ffmpegCommand: FfmpegCommand = Ffmpeg(path.join(__dirname,inputFilePath))
					.saveToFile(`${path.join(__dirname, outputPath)}.${targetFormat}`)
				if (options?.filter !== []) {
					ffmpegCommand.addOptions(options?.filter as string[])
				}
				if (options?.encoder !== []) {
					ffmpegCommand.addOptions(options?.encoder as string[])
				}
				ffmpegCommand.run()
				resolve("Done.")
			}
			catch (err) {
				reject(err)
			}
		})
	}
	async getAvailableCodecs(): Promise<IFFmpegCapabilitiesObject<ICodecData>> {
		return await new Promise((resolve, reject) => {
			Ffmpeg.getAvailableCodecs(
				(err: Error, codecs: IFFmpegCapabilitiesObject<ICodecData>) => {
					if (err) {
						reject(err)
					}
					resolve(codecs)
				}
			)
		})
	}
	async getAvailableEncoders(): Promise<IFFmpegCapabilitiesObject<IEncoderData>> {
		return await new Promise((resolve, reject) => {
			Ffmpeg.getAvailableEncoders(
				(err: Error, encoders: IFFmpegCapabilitiesObject<IEncoderData>) => {
					if (err) {
						reject(err)
					}
					resolve(encoders)
				}
			)
		})
	}
	async getAvailableFilters(): Promise<IFFmpegCapabilitiesObject<IFilterData>> {
		return await new Promise((resolve, reject) => {
			Ffmpeg.getAvailableFilters(
				(err: Error, filters: IFFmpegCapabilitiesObject<IFilterData>) => {
					if (err) {
						reject(err)
					}
					resolve(filters)
				}
			)
		})
	}
	async getAvailableFormats(): Promise<IFFmpegCapabilitiesObject<IFormatData>> {
		return await new Promise((resolve, reject) => {
			Ffmpeg.getAvailableFormats(
				(err: Error, formats: IFFmpegCapabilitiesObject<IFormatData>) => {
					if (err) {
						reject(err)
					}
					resolve(formats)
				}
			)
		})
	}
}