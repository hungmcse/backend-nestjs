import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {JWTPayload} from '@internal/core/auth/auth.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({secretOrKey: process.env.JWT_SECRET, jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()});
	}

	public async validate(payload: JWTPayload): Promise<JWTPayload> {
		return payload;
	}
}
