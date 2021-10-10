import {Body, Controller, Post} from '@nestjs/common';
import {UserService} from './user.service';
import {LoginBodyDto, LoginDto, LoginResponseDto} from '@internal/shared/dto/login.dto';

@Controller()
export class UserController {

	constructor(private userService: UserService) {
	}

	@Post(LoginDto.url)
	public async login(
		@Body() body: LoginBodyDto,
	): Promise<LoginResponseDto> {
		const rs = await this.userService.loginUser({username: body.username, password: body.password});
		return {token: rs.jwtToken};
	}
}
