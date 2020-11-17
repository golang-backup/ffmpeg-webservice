//#region Review
export interface IConvertedFile {
	// TODO: review if this is sufficient for usecase.
	outputFilename: string,
	path: string,
	resultFile: Buffer
}
export interface IConversionParams {
	// TODO: review if this is sufficient for usecase.
	conversionId: string,
	filePath: string,
	outputFilename?: string,
	targetFormat: string
}
//#endregion
//#region Capabilities
/* Generic Capabilities Object for FFmpeg */
export interface IFFmpegCapabilities {
	filters: IFilter[]
	formats: IFormat[]
	codecs: ICodec[]
	encoders: IEncoder[]
}
/**
	 * Returns all available codecs that can be used with FFmpeg.
	 *
	 * @tsoaModel
	 * @example
	 * {
	 *  "mp3": {
	 *    "type": "audio",
	 *    "description": "(decoders: mp3float mp3 ) (encoders: libmp3lame )",
	 *    "canDecode": true,
	 *    "canEncode": true,
	 *    "intraFrameOnly": true,
	 *    "isLossy": true,
	 *    "isLossless": false
	 *  },
	 *  "libmp3lame": {
	 *    "type": "audio",
	 *    "description": "(decoders: mp3float mp3 ) (encoders: libmp3lame )",
	 *    "intraFrameOnly": true,
	 *    "isLossy": true,
	 *    "isLossless": false,
	 *    "canEncode": true
	 *  }
	 * }
	 */
export interface IFFmpegCapabilitiesObject<T> {
	[key: string]: T
}
/* FFmpeg interfaces for internal data structures */
export interface IFormat extends IFormatData {
	name: string
}
export interface IFormatData {
	canDemux: boolean
	canMux: boolean
	description: string
}
/**
 * @tsoaModel
 * @example
 * {
 *   "type": "audio",
 *   "description": "(decoders: mp3float mp3 ) (encoders: libmp3lame )",
 *   "canDecode": true,
 *   "canEncode": true,
 *   "intraFrameOnly": true,
 *   "isLossy": true,
 *   "isLossless": false
 * }
 */
export type TCapabilities = ICodec | IFilter | IFormat | IEncoder
export type TCapabilitiesData = ICodecData | IFilterData | IFormatData | IEncoderData

export interface ICodec extends ICodecData {
	name: string
}
export interface ICodecData {
	type: string
	description: string
	canDecode: boolean
	canEncode: boolean
	drawHorizBand?: boolean
	directRendering?: boolean
	weirdFrameTruncation?: boolean
	intraFrameOnly?: boolean
	isLossy?: boolean
	isLossless?: boolean
}
export interface IEncoder extends IEncoderData {
	name: string
}
export interface IEncoderData {
	description: string
	directRendering: boolean
	drawHorizBand: boolean
	experimental: boolean
	frameMT: boolean
	sliceMT: boolean
	type: string
}
export interface IFilter extends IFilterData {
	name: string
}
export interface IFilterData {
	description: string
	input: string
	multipleInputs: boolean
	multipleOutputs: boolean
	output: string
}
//#endregion