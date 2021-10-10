import {Logger} from 'typeorm';
import {LoggerService} from '@nestjs/common';

export class DBLogger implements Logger {
	private context = '[DB]';

	constructor(
		public logger: LoggerService,
	) {
	}

	public logQuery(
		query: string, parameters?: any[] | undefined, _queryRunner?: import('typeorm').QueryRunner | undefined
	): void {
		this.log('log', query);
		this.log('log', parameters);
	}

	public logQueryError(
		error: string, query: string, parameters?: any[] | undefined, _queryRunner?: import('typeorm').QueryRunner | undefined
	): void {
		this.log('error', error);
		this.log('error', query);
		this.log('error', parameters);
	}

	public logQuerySlow(
		time: number, query: string, parameters?: any[] | undefined, _queryRunner?: import('typeorm').QueryRunner | undefined
	): void {
		this.log('warn', time + '=SLOW=' + query);
		parameters && this.log('warn', parameters);
	}

	public logSchemaBuild(message: string, _queryRunner?: import('typeorm').QueryRunner | undefined): void {
		this.log('log', message);
	}

	public logMigration(message: string, _queryRunner?: import('typeorm').QueryRunner | undefined): void {
		this.log('log', message);
	}

	public log(
		level: 'log' | 'info' | 'warn' | 'error', message: any, _queryRunner?: import('typeorm').QueryRunner | undefined
	): void {
		if (level === 'log') {
			this.logger.log(this.context + message);
		} else if (level === 'info') {
			this.logger.log(this.context + message);
		} else if (level === 'warn') {
			this.logger.warn(this.context + message);
		} else if (level === 'error') {
			this.logger.error(this.context + message);
		}
	}

}
