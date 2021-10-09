import {Body, Controller, Post} from "@nestjs/common";
import {UserService} from "./user.service";
import {RegisterBodyDto, RegisterDto, RegisterResponseDto} from "@internal/shared/dto/user/register.dto";
import {LoginBodyDto, LoginDto, LoginResponseDto} from "@internal/shared/dto/user/login.dto";

@Controller()
export class UserController {

	constructor(private userService: UserService) {}

	@Post(RegisterDto.url)
	public async registerUser(
		@Body() body: RegisterBodyDto,
	): Promise<RegisterResponseDto> {
		return this.userService.createUser({username: body.username, password: body.password});
	}

	@Post(LoginDto.url)
	public async login(
		@Body() body: LoginBodyDto,
	): Promise<LoginResponseDto> {
		const rs = await this.userService.loginUser({username: body.username, password: body.password});
		return {token: rs.jwtToken};
	}
}
