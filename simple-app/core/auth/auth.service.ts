import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {JWTPayload} from '@internal/core/auth/auth.payload';
import {EnvironmentService} from '@internal/core/environment/environment.service';
import {classToPlain} from 'class-transformer';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly envService: EnvironmentService,
	) {
	}

	public signToken(payload: JWTPayload, expireTime = this.envService.ENVIRONMENT.TOKEN_EXPIRE): string {
		return this.jwtService.sign(classToPlain(payload), {
			expiresIn: expireTime,
		})
	}
}
