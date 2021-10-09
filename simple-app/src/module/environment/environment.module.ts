import {Global, Module} from "@nestjs/common";
import {EnvironmentService} from "@internal/core/environment/environment.service";
import {AppEnvironmentService} from "./environment.service";

@Global()
@Module({
	providers: [
		AppEnvironmentService,
		{
			provide: EnvironmentService,
			useExisting: AppEnvironmentService,
		},
	],
	exports: [
		AppEnvironmentService,
		{
			provide: EnvironmentService,
			useExisting: AppEnvironmentService,
		},
	],
})
export class AppEnvironmentModule {}
