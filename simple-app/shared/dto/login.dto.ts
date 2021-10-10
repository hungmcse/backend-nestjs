import {DTO, METHOD} from './base.dto';
import {IsString} from 'class-validator';

export class LoginBodyDto {
	@IsString()
	public username!: string;

	@IsString()
	public password!: string;
}

export class LoginResponseDto {

	@IsString()
	public token: string;

	constructor(token: string) {
		this.token = token;
	}
}

export class LoginDto extends DTO {
	public static url = 'api/login';
	public readonly method = METHOD.POST;
	public query = undefined;
	public params = undefined;
	public readonly response = LoginResponseDto;
	public readonly url = LoginDto.url;

	constructor(public body: LoginBodyDto) {
		super();
	}
}
