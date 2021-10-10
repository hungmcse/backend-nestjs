import {CallHandler, ExecutionContext, HttpException, Injectable, Logger, NestInterceptor} from '@nestjs/common';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ResponseDTO} from '@internal/shared/dto/base.dto';
import {Response} from 'express';
import {SYSTEM_CODE} from '@internal/shared/code/system-code';

@Injectable()
export class BaseResponseInterceptor<T>
	implements NestInterceptor<unknown, ResponseDTO<T>> {

	protected logger = new Logger(ResponseInterceptor.name);

	public intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseDTO<any>> {
		const res: Response = context.switchToHttp().getResponse();
		return next.handle().pipe(map((response: unknown) => {
			return {
				systemCode: SYSTEM_CODE.SUCCESS,
				data: response,
			};
		}), catchError((err: HttpException | Error) => {
			this.logger.debug(err);
			this.logger.debug(err.stack);
			let httpCode: number = 500;
			if (err instanceof HttpException) {
				httpCode = (err && err.getStatus) ? err.getStatus() : httpCode;
				res.status(httpCode);
			} else {
				httpCode = res.statusCode;
			}
			let systemCode = SYSTEM_CODE.SORRY_SOMETHING_WENT_WRONG;
			if (httpCode === 400) {
				systemCode = SYSTEM_CODE.BAD_REQUEST;
			} else if (httpCode === 401) {
				systemCode = SYSTEM_CODE.UNAUTHORIZED;
			} else if (httpCode === 403) {
				systemCode = SYSTEM_CODE.FORBIDDEN;
			} else if (httpCode < 300) {
				res.status(500);
			}
			return of({
				systemCode,
				data: undefined,
			});
		}));
	}
}

export class ResponseInterceptor<T> extends BaseResponseInterceptor<T> {
}
