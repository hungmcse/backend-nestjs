import {ValueProvider} from "@nestjs/common/interfaces";
import {Injectable, Logger} from "@nestjs/common";
import {validateSync} from "class-validator";
import {plainToClass} from "class-transformer";
import {Environment, EnvironmentService} from "@internal/core/environment/environment.service";

export class AppEnvironment extends Environment {
}

@Injectable()
export class AppEnvironmentService extends EnvironmentService {

	protected logger = new Logger(AppEnvironmentService.name);

	public readonly ENVIRONMENT: AppEnvironment;

	constructor() {
		super();
		this.ENVIRONMENT = plainToClass(AppEnvironment, {
			...new AppEnvironment(), // Include default value
			...process.env, // ENV override
		}, {excludeExtraneousValues: true});
		const res = validateSync(this.ENVIRONMENT);
		if (res.length) {
			this.logger.log(this.ENVIRONMENT);
			throw res;
		}
	}

}

export const EnvironmentProvider: ValueProvider<AppEnvironmentService> = {
	provide: AppEnvironmentService,
	useValue: new AppEnvironmentService(),
};
