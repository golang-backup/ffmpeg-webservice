import { IConversionQueueStatus } from "./interface"
import { IConversionRequestBody, IConversionResultFile } from "../../model"
export class ConversionService {
	static convertFile(file: IConversionRequestBody): any {
		return {
			message: "Not yet implemented."
		}
	}
	static async getConvertedFile(fileId: string): Promise<IConversionResultFile> {
		return await new Promise((resolve, reject) => resolve())
	}
	public getConversionQueueStatus(): IConversionQueueStatus {
		// Todo: implement
		return {
			conversions: [],
			remainingConversions: 0
		}
	}
	async getSupportedFormats(): Promise<void> {
		await new Promise((resolve, reject) => resolve())
		return
	}
}