import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {EntityManager, FindConditions} from 'typeorm';
import {UserEntity} from '../../entity/user.entity';
import {SYSTEM_CODE} from '@internal/shared/code/system-code';
import {plainToClass, plainToClassFromExist} from 'class-transformer';

@Injectable()
export class UserSql {
	public async getUser(conditions: FindConditions<UserEntity>, manager: EntityManager): Promise<{ user?: UserEntity, requiredResult: UserEntity }> {
		const user = await manager.getRepository(UserEntity).findOne(conditions);

		return {
			user,
			get requiredResult(): UserEntity {
				if (user) {
					return user;
				}
				throw new InternalServerErrorException(SYSTEM_CODE.BAD_REQUEST);
			},
		}
	}

	public async createUser(payload: Partial<UserEntity>, manager: EntityManager): Promise<UserEntity> {
		const entity = plainToClass(UserEntity, payload);
		const res = await manager.getRepository(UserEntity).save(entity);
		return plainToClassFromExist(entity, res);
	}
}
