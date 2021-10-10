import {ValueProvider} from '@nestjs/common/interfaces';
import {Injectable, Logger} from '@nestjs/common';
import {IsBoolean, IsEnum, IsNumber, IsString, validateSync} from 'class-validator';
import {Expose, plainToClass, Type} from 'class-transformer';

export enum ENVIRONMENTS {
	DEVELOP = 'DEVELOP',
	SIT = 'SIT',
	UAT = 'UAT',
	PRODUCTION = 'PRODUCTION',
}

export class Environment {
	@IsNumber()
	@Type(() => Number)
	@Expose()
	public DB_PORT!: number;

	@IsString()
	@Type(() => String)
	@Expose()
	public DB_HOST!: string;

	@IsString()
	@Type(() => String)
	@Expose()
	public DB_NAME!: string;

	@IsString()
	@Type(() => String)
	@Expose()
	public DB_USER!: string;

	@IsString()
	@Type(() => String)
	@Expose()
	public DB_PASSWORD!: string;

	@IsNumber()
	@Type(() => Number)
	@Expose()
	public API_PORT!: number;

	@IsString()
	@Expose()
	public APP_BASE_URL: string = '';

	@IsString()
	@Expose()
	public JWT_SECRET: string = '';

	@IsNumber()
	@Type(() => Number)
	@Expose()
	public TOKEN_EXPIRE: number = 1800;

	@Expose()
	@IsEnum(ENVIRONMENTS)
	public ENV_PUBLISH_API: ENVIRONMENTS = ENVIRONMENTS.PRODUCTION;

	@Expose()
	@IsBoolean()
	public SSL: boolean = false;
}

@Injectable()
export class EnvironmentService {

	protected logger = new Logger(EnvironmentService.name);

	public readonly ENVIRONMENT: Environment;

	constructor() {
		this.ENVIRONMENT = plainToClass(Environment, {
			...new Environment(), // Include default value
			...process.env, // ENV override
		}, {excludeExtraneousValues: true});
		const res = validateSync(this.ENVIRONMENT);
		if (res.length) {
			this.logger.log(this.ENVIRONMENT);
			throw res;
		}
	}
}

export const EnvironmentProvider: ValueProvider<EnvironmentService> = {
	provide: EnvironmentService,
	useValue: new EnvironmentService(),
};
