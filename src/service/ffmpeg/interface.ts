export interface IConvertedFile {
	outputFilename: string,
	path: string,
	resultFile: Buffer
}
export interface IConversionParams {
	conversionId: string,
	filePath: string,
	outputFilename?: string,
	targetFormat: string
}