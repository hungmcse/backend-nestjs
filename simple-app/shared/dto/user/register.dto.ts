import {DTO, METHOD} from "@internal/shared/dto/base.dto";
import {IsBoolean, IsString} from "class-validator";

export class RegisterBodyDto {
	@IsString()
	public username!: string;

	@IsString()
	public password!: string;
}

export class RegisterResponseDto {
	@IsBoolean()
	public isSuccess!: boolean;
}

export class RegisterDto extends DTO {
	public static url = "api/register";
	public readonly method = METHOD.POST;
	public queryDTO = undefined;
	public paramsDTO = undefined;
	public readonly responseDTOClass = RegisterResponseDto;
	public readonly url = RegisterDto.url;

	constructor(public bodyDTO: RegisterBodyDto) {
		super();
	}
}
