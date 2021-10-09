import {Module} from "@nestjs/common";
import {JwtModule, JwtModuleOptions} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {JwtStrategy} from "./jwt.strategy";
import {EnvironmentService} from "@internal/core/environment/environment.service";
import {EnvironmentModule} from "@internal/core/environment/environment.module";

@Module({
	imports: [
		PassportModule.register({defaultStrategy: "jwt"}),
		JwtModule.registerAsync({
			imports: [EnvironmentModule],
			useFactory: async (env: EnvironmentService): Promise<JwtModuleOptions> => {
				return {
					secret: env.ENVIRONMENT.JWT_SECRET,
				}
			},
			inject: [EnvironmentService],
		}),
	],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService, PassportModule],
})
export class AuthModule {
}
