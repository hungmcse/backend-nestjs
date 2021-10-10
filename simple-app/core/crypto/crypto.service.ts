import {Injectable} from '@nestjs/common';
import {pbkdf2, randomBytes} from 'crypto';

@Injectable()
export class CryptoService {

	public async hashPassword(
		pwd: string,
		salt: Buffer | string = randomBytes(64),
		iterations: number = 300000,
	): Promise<{ hash: string, salt: string | Buffer, iterations: number, finalPassword: string }> {
		return new Promise((resolve, reject) => {
			pbkdf2(pwd, salt, iterations, 64, 'sha512', (err, derivedKey) => {
				if (err) {
					reject(err);
				} else {
					const res = {
						hash: derivedKey.toString('base64'),
						salt: salt.toString('base64'),
						iterations,
					};
					resolve({
						...res,
						finalPassword: `${res.hash}.${res.salt}.${iterations}`,
					});
				}
			})
		});
	}
}
