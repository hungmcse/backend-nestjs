import {Test, TestingModule} from '@nestjs/testing';
import {UserController} from '../../src/module/user/user.controller';
import {UserSql} from '../../src/module/user/user.sql';
import {UserService} from '../../src/module/user/user.service';
import {AuthModule} from '@internal/core/auth/auth.module';
import {typeormModule} from '../../src/typeorm.module';
import {Logger} from '@nestjs/common';
import {AppEnvironmentModule} from '../../src/module/environment/environment.module';
import {CryptoModule} from '@internal/core/crypto/crypto.module';

// TODO: Build test file into js
describe('User Unit Test', () => {
	let app: any;
	let userService: UserService;

	const user = {
		username: 'hungmc',
		password: 'Vo1scQQ5tqCXSpoV+a11rW8Ydy2bSj1XlhsKjtMi+VmJCV5IvkkVm87e2tWhB43saODpT/IhZ6HzUal3fbI9gA==.j1nCeksek1gNRAilejgauyZb6DsSyjZXfc5iLhzqstl7XwIm+2zKo8fBWlF5fsfd70MDIlZ/rmoSnXsHWs1BTQ==.300000',
		basePassword: '1234',
	}
	const userSql = {
		getUser: (): any => ({
			user,
			requiredResult: user,
		}),
	};
	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [CryptoModule, AppEnvironmentModule, AuthModule, ...typeormModule(new Logger('DB'))],
			controllers: [UserController],
			providers: [UserSql, UserService],
		}).overrideProvider(UserSql).useValue(userSql).compile();
		userService = moduleFixture.get<UserService>(UserService);
		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	})

	it('Test login 1', async () => {
		const rs = await userService.loginUser({username: user.username, password: user.basePassword});
		expect(rs.jwtToken).toBeDefined();
	});

	it('Test login 2', async () => {
		expect(userService.loginUser({username: user.username, password: user.basePassword + '23'})).toThrowError();
	});
});
