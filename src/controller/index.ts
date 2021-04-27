import {
	Controller,
    Example,
	Get,
	Route,
	Tags
} from "tsoa"
import { Inject } from "typescript-ioc"
import { EHttpResponseCodes } from "../constants"
import { Logger } from "../service/logger"
@Route("/")
export class IndexController extends Controller {
    @Inject
    private readonly logger!: Logger

    @Tags("Misc.")
	@Get("/ping")
	@Example<string>("pong")
	public getPingResponse(): string {
		this.logger.log("Received 'ping' signal.")
		this.setStatus(EHttpResponseCodes.ok)
		return "pong"
	}
}