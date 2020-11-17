import { FFmpegWrapper } from "../service/ffmpeg"
import { ICodec, IEncoder, IFilter, IFormat } from "../service/ffmpeg/interface"
import {
    CapabilityService
} from "../service/capabilities"
describe.skip("CapabilityService should pass all tests",  () => {
    describe("It should name capabilities correctly", () => {
        const capabilityService = new CapabilityService()
        const ffmpeg = new FFmpegWrapper()
        it("should convert ffmpeg codec output in correct named format", async function (done: jest.DoneCallback) {
            /* Arrange */
            const unnamedCapabilities = await ffmpeg.getAvailableCodecs()
            const namedCapabilities = capabilityService.nameCapability<ICodec>(unnamedCapabilities)
            const codecs = capabilityService.getAvailableCodecs()
            /* Assert */
            expect(codecs).resolves.toMatchObject(namedCapabilities)
            done()
        })
        it("should convert ffmpeg encoders output in correct named format", async function (done: jest.DoneCallback) {
            /* Arrange */
            const unnamedEncoders = await ffmpeg.getAvailableEncoders()
            const namedEncoders = capabilityService.nameCapability<IEncoder>(unnamedEncoders)
            const encoders = capabilityService.getAvailableEncoders()
            /* Assert */
            expect(encoders).resolves.toMatchObject(namedEncoders)
            done()
        })
        it("should convert ffmpeg filters output in correct named format", async function (done: jest.DoneCallback) {
            /* Arrange */
            const unnamedFilters = await ffmpeg.getAvailableFilters()
            const namedFilters = capabilityService.nameCapability<IFilter>(unnamedFilters)
            const filters = capabilityService.getAvailableFilters()
            /* Assert */
            expect(filters).resolves.toMatchObject(namedFilters)
            done()
        })
        it("should convert ffmpeg formats output in correct named format", async function (done: jest.DoneCallback) {
            /* Arrange */
            const unnamedFormats = await ffmpeg.getAvailableFormats()
            const namedFormats = capabilityService.nameCapability<IFormat>(unnamedFormats)
            const formats = await capabilityService.getAvailableFormats()
            /* Assert */
            expect(formats).toMatchObject(namedFormats)
            for (const name in unnamedFormats) {
                expect(formats.find(format => format.name === name)).not.toBeUndefined()
            }
            done()
        })
    })
})