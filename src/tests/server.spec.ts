import { Server } from "../service/api"
const defaultPort: number = 3000
const port: number = 1337
const port2: number = 2222
let port3: number
describe("Port is assigned to correct value: ", () => {
	let server: Server
	it("should have port 1337", () => {
		server = new Server(port)
		expect(server.port).toBe(port)
	})
	it("should have port 2222", () => {
		server = new Server(port2)
		expect(server.port).toBe(port2)
	})
	it("should have port the default port: 1111", () => {
		server = new Server(port3)
		expect(server.port).toBe(defaultPort)
	})
})