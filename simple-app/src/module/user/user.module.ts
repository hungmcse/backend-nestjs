import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {UserSql} from './user.sql';
import {AuthModule} from '@internal/core/auth/auth.module';

@Module({
	imports: [UserModule, AuthModule],
	providers: [
		UserService,
		UserSql,
	],
	controllers: [
		UserController,
	],
	exports: [
		UserService,
		UserSql,
	],
})
export class UserModule {

}
