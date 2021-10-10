import {Logger, Module} from '@nestjs/common';
import {ResponseInterceptor} from '@internal/core/interceptor/response.interceptor';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {typeormModule} from './typeorm.module';
import {AuthModule} from '@internal/core/auth/auth.module';
import {UserModule} from './module/user/user.module';
import {AppEnvironmentModule} from './module/environment/environment.module';
import {CryptoModule} from '@internal/core/crypto/crypto.module';

@Module({
	imports: [
		AppEnvironmentModule,
		...typeormModule(new Logger('DB')),
		UserModule,
		AuthModule,
		CryptoModule,
	],
	providers: [{
		provide: APP_INTERCEPTOR,
		useClass: ResponseInterceptor,
	},
	],
})
export class AppModule {
}
