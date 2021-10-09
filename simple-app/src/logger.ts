import {LoggerService} from "@nestjs/common";
import * as Pino from "pino";

export const pino = Pino({
	level: "trace",
});

export class TinyLogger implements LoggerService {

	constructor(
		private context: string,
	) {}

	public log(message: any, context?: string | undefined): void {
		pino.trace(this.context + `[${context}]` + message);
	}

	public info(message: any, context?: string | undefined): void {
		pino.info(this.context + `[${context}]` + message);
	}

	public error(message: any, trace?: string | undefined, context?: string | undefined): void {
		pino.error(this.context + `[${context}]` + message + "---" + trace);
    }

	public warn(message: any, context?: string | undefined): void {
		pino.warn(this.context + `[${context}]` + message);
    }

	public debug(message: any, context?: string | undefined): void {
		pino.debug(this.context + `[${context}]` + message);
	}

}
