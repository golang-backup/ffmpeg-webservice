import { IConversionRequestBody, IConversionResultFile } from "~/model"
export class ConversionService {
	static convertFile(file: IConversionRequestBody): any {
		return {
			message: "Not yet implemented."
		}
	}
	static getConvertedFile(fileId: string): IConversionResultFile {
		return {
			filename: "test.pdf"
		}
	}
}