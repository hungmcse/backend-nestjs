import {Injectable} from '@nestjs/common';
import {EntityManager} from 'typeorm';
import {plainToClass, plainToClassFromExist} from 'class-transformer';
import {VideoEntity} from '../../entity/video.entity';
import {PagingRequestDto} from '@internal/shared/dto/paging.dto';

@Injectable()
export class VideoSql {
	public async getVideos(paging: PagingRequestDto, manager: EntityManager): Promise<{ videos: VideoEntity[] }> {
		const videos = await manager.getRepository(VideoEntity).find({
			skip: paging.skip,
			take: paging.pageSize,
		});

		return {
			videos,
		}
	}

	public async createVideo(payload: Partial<VideoEntity>, manager: EntityManager): Promise<VideoEntity> {
		const entity = plainToClass(VideoEntity, payload);
		const res = await manager.getRepository(VideoEntity).save(entity);
		return plainToClassFromExist(entity, res);
	}
}
