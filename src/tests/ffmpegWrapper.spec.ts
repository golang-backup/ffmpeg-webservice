import { FFmpegWrapper } from "../service/ffmpeg"
describe("FFmpegWrapper should pass all tests", () => {
	const ffmpeg: FFmpegWrapper = new FFmpegWrapper()
	it("should convert .mp3 to .mp4", async (done: jest.DoneCallback) => {
		const conversion = await ffmpeg.convertToTargetFormat(
			"./sample-input/aWholesomeLesson.mp3",
			"ffmConverted",
			"mp3",
			"mp4"
		)
		expect(conversion).toBeDefined()
		done()
	})
	it("should convert .mp3 to .mp4 with different path", async (done: jest.DoneCallback) => {
		const conversion = await ffmpeg.convertToTargetFormat(
			"sample-input/aWholesomeLesson.mp3",
			"ffmConvertedToo",
			"mp3",
			"mp4"
		)
		expect(conversion).toBeDefined()
		done()
	})
})