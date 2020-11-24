import { EHttpResponseCodes } from "../../constants"
import { Inject } from "typescript-ioc"
import { Logger } from "../logger"
import { RegisterRoutes } from "../../routes/routes"
import { createDirectoryIfNotPresent } from "../file-io"
import Ffmpeg from "fluent-ffmpeg"
import bodyParser from "body-parser"
import cors from "cors"
import express, {
	Application, Express, NextFunction, Request, Response
} from "express"
import path from "path"
import swaggerDocument from "../../../swagger.json"
import swaggerUi from "swagger-ui-express"
export class Api {
	@Inject
	private readonly logger!: Logger
	private readonly _port: number
	private readonly app: Application
	private readonly defaultPort: number = 3000
	private readonly startUpDelay: number = 1500
	constructor(port?: number) {
		this.app = express()
		this._port = port ?? this.defaultPort
		this.configureServer()
		this.addApi()
		Ffmpeg().setFfmpegPath("/opt/ffmpeg/bin/ffmpeg")
		this.createApplicationDirectiories(["input", "output"])
		setTimeout(
			() => this.listen(),
			this.startUpDelay
		)
	}
	listen = (): void => {
		this.app.listen(this.port, () => {
			this.logger.log(`Listening on port ${this.port}`)
		})
	}
	private readonly addApi = (): void => {
		this.app.get("/", (req, res, err) => {
			res.send("Request received")
		})
		RegisterRoutes(this.app as Express)
		this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument as any))
		this.app.get("/swagger.json", (req: Request, res: Response) => res.json(swaggerDocument))
		this.app.use((
			err: any,
			req: Request,
			res: Response,
			next: NextFunction
		) => {
			const status = err.status || EHttpResponseCodes.internalServerError
			this.logger.error(err)
			const body: any = {
				fields: err.fields || undefined,
				message: err.message || "An error occurred during the request.",
				name: err.name,
				status
			}
			res.status(status).json(body)
			next()
		})
	}
	private readonly configureServer = (): void => {
		// Mount json form parser
		this.app.use(cors())
		// Set max limit
		this.app.use(bodyParser.urlencoded({
			extended: true,
			limit: "50mb"
		}))
		this.app.use(bodyParser.json({
			limit: "50mb"
		}))
		// This.app.use(methodOverride());
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			res.header("Access-Control-Allow-Origin", "*")
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
			console.log(`Request received: ${req.method} ${req.url}`)
			next()
		})
	}
	private createApplicationDirectiories(directories: string[]): void {
		const basePath = path.join(__dirname, "../../..")
		const promises = []
		for (const directory of directories) {
			promises.push(createDirectoryIfNotPresent(path.join(basePath, directory)))
		}
		Promise.all(promises)
			.then(res => console.log(res))
			.catch(console.error)
	}
	get port(): number {
		return this._port
	}
}