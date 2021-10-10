
export abstract class DTO {
	public abstract query: any;
	public abstract body: any;
	public abstract readonly url: string;
	public abstract readonly method: METHOD;
	public abstract readonly response: any;
}

export class ResponseDTO<T> {
	constructor(
		public data: T,
		public systemCode: string,
	) {
	}
}

export enum METHOD {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
}