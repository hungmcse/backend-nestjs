import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectConnection} from "@nestjs/typeorm";
import {CONNECTION_NAME} from "@internal/core/definitions";
import {Connection} from "typeorm";
import {UserSql} from "./user.sql";
import {CryptoService} from "@internal/core/crypto/crypto.service";
import {SYSTEM_CODE} from "@internal/shared/code/system-code";
import {AuthService} from "@internal/core/auth/auth.service";
import {UserJWTPayload} from "@internal/core/auth/auth.payload";

@Injectable()
export class UserService {

	constructor(
		@InjectConnection(CONNECTION_NAME.TASK_DB) private connection: Connection,
		private userSql: UserSql,
		private cryptoService: CryptoService,
		private authService: AuthService,
	) {
	}

	public async createUser(payload: { username: string, password: string }): Promise<{ isSuccess: boolean }> {
		const user = await this.userSql.getUser({
			username: payload.username,
		}, this.connection.manager);
		if (user.user) {
			throw new BadRequestException(SYSTEM_CODE.USER_EXIST);
		}
		const encryptedPass = await this.cryptoService.hashPassword(payload.password);
		await this.userSql.createUser({
			username: payload.username,
			password: encryptedPass.finalPassword,
		}, this.connection.manager);
		return {isSuccess: true};
	}

	public async loginUser(payload: { username: string, password: string }): Promise<{ jwtToken: string }> {
		const user = await this.userSql.getUser({
			username: payload.username,
		}, this.connection.manager);

		const partsOfPass = user.requiredResult.password.split(".");
		const encryptedPass = await this.cryptoService.hashPassword(
			payload.password,
			Buffer.from(partsOfPass[1], "base64"),
			Number(partsOfPass[2]));
		if (user.requiredResult.password === encryptedPass.finalPassword) {
			const jwtToken = this.authService.signToken(new UserJWTPayload(payload.username));
			return {jwtToken};
		}
		throw new BadRequestException(SYSTEM_CODE.INVALID_USER_INFO);
	}
}
