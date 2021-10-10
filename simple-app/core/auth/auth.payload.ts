import {IsEnum, IsNumber} from 'class-validator';
import {Exclude, Expose} from 'class-transformer';

export enum TOKEN_TYPE {
	BASE = 'BASE',
	USER = 'USER',
}

export enum PERMISSION {
}

@Exclude()
export abstract class JWTPayload<P extends PERMISSION = PERMISSION> {

	@IsEnum(TOKEN_TYPE)
	@Expose()
	public readonly abstract type: TOKEN_TYPE = TOKEN_TYPE.BASE;

	@IsNumber()
	@Expose()
	public time!: number;

	@IsEnum(PERMISSION, {each: true})
	public abstract readonly permissions: P[] = [];

	protected constructor() {
		this.time = new Date().getTime();
	}
}

export class UserJWTPayload extends JWTPayload {
	@IsEnum(TOKEN_TYPE)
	@Expose()
	public readonly type: TOKEN_TYPE = TOKEN_TYPE.USER;

	@IsEnum(PERMISSION, {each: true})
	public readonly permissions = [];

	constructor(public username: string) {
		super();
	}
}
