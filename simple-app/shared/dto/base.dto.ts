
export abstract class DTO {
	public abstract paramsDTO: any;
	public abstract queryDTO: any;
	public abstract bodyDTO: any;
	public abstract readonly url: string;
	public abstract readonly method: METHOD;
	public abstract readonly responseDTOClass: any;
}

export class ResponseDTO<T> {
	constructor(
		public data: T,
		public systemCode: string,
	) {
	}
}

export enum METHOD {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
}
