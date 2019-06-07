import { LogLevel } from "./LogLevel";
import { Logger } from "./Logger";
import { LoggingBackend } from "./LoggingBackend";

/**
 * A default logger implementation that forwards
 * calls to level-specific logging methods to the
 * generic 'log' method and automatically substitutes
 * parameters by their provided arguments.
 * 
 * This means that subclasses only have to implement
 * 'outputMessage'.
 */
export class DefaultLogger implements Logger {
	private backend: LoggingBackend;
	
	/**
	 * Creates a new logger that outputs
	 * its messages to the specified backend.
	 * 
	 * @param backend The log message sink
	 */
	constructor(backend: LoggingBackend) {
		this.backend = backend;
	}
	
	private outputMessage(msg: string) {
		this.backend.output(msg);
	}
	
	private stringify(arg: any): string {
		if (typeof arg == "function") {
			return arg();
		} else {
			return "" + arg;
		}
	}
	
	async log(level: number, msg: string, ...args: any[]): Promise<void> {
		const parameterPattern = /\{(.*)\}/g;
		let match = parameterPattern.exec(msg);
		let result = "";
		
		while (match) {
			const isDebugMatch = match[1] === "?:";
			match = parameterPattern.exec(msg);
		}
	}
	
	async error(msg: string, ...args: any[]): Promise<void> {
		await this.log(LogLevel.Error, msg, ...args);
	}
	
	async warn(msg: string, ...args: any[]): Promise<void> {
		await this.log(LogLevel.Warn, msg, ...args);
	}
	
	async info(msg: string, ...args: any[]): Promise<void> {
		await this.log(LogLevel.Info, msg, ...args);
	}
	
	async debug(msg: string, ...args: any[]): Promise<void> {
		await this.log(LogLevel.Debug, msg, ...args);
	}
	
	async trace(msg: string, ...args: any[]): Promise<void> {
		await this.log(LogLevel.Trace, msg, ...args);
	}
	
	async deepTrace(msg: string, ...args: any[]): Promise<void> {
		await this.log(LogLevel.DeepTrace, msg, ...args);
	}
}
