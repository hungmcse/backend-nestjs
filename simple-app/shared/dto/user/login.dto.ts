import {DTO, METHOD} from "@internal/shared/dto/base.dto";
import {IsString} from "class-validator";

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
	public static url = "api/login";
	public readonly method = METHOD.POST;
	public queryDTO = undefined;
	public paramsDTO = undefined;
	public readonly responseDTOClass = LoginResponseDto;
	public readonly url = LoginDto.url;

	constructor(public bodyDTO: LoginBodyDto) {
		super();
	}
}
