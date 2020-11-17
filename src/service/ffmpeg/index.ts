import Ffmpeg from "fluent-ffmpeg"
import {
	ICodecData,
	IEncoderData,
	IFFmpegCapabilitiesObject,
	IFormatData,
	IFilterData
} from "./interface"
export class FFmpegWrapper {
	async convertToTargetFormat(
		inputFilePath: string, outputPath: string, targetFormat: string
	): Promise<unknown> {
		return await new Promise((resolve, reject) => {
			
			resolve()
		})
	}
	async getAvailableCodecs(): Promise<IFFmpegCapabilitiesObject<ICodecData>> {
		return await new Promise((resolve, reject) => {
			Ffmpeg.getAvailableCodecs((err: Error, codecs: IFFmpegCapabilitiesObject<ICodecData>) => {
				if (err) {
					reject(err)
				}
				resolve(codecs)
			})
		})
	}
	async getAvailableEncoders(): Promise<IFFmpegCapabilitiesObject<IEncoderData>> {
		return await new Promise((resolve, reject) => {
			Ffmpeg.getAvailableEncoders((err: Error, encoders: IFFmpegCapabilitiesObject<IEncoderData>) => {
				if (err) {
					reject(err)
				}
				resolve(encoders)
			})
		})
	}
	async getAvailableFilters(): Promise<IFFmpegCapabilitiesObject<IFilterData>> {
		return await new Promise((resolve, reject) => {
			Ffmpeg.getAvailableFilters((err: Error, filters: IFFmpegCapabilitiesObject<IFilterData>) => {
				if (err) {
					reject(err)
				}
				resolve(filters)
			})
		})
	}
	async getAvailableFormats(): Promise<IFFmpegCapabilitiesObject<IFormatData>> {
		return await new Promise((resolve, reject) => {
			Ffmpeg.getAvailableFormats((err: Error, formats: IFFmpegCapabilitiesObject<IFormatData>) => {
				if (err) {
					reject(err)
				}
				resolve(formats)
			})
		})
	}
}