import {createParamDecorator} from '@nestjs/common';
import {JWTPayload} from './auth.payload';

export const JWTContent =
	createParamDecorator(<T extends JWTPayload>(_: any, req: any): T => {
		return req.switchToHttp().getRequest().user;
	});
