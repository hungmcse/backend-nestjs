import {Injectable} from '@nestjs/common';
import {InjectConnection} from '@nestjs/typeorm';
import {CONNECTION_NAME} from '@internal/core/definitions';
import {Connection} from 'typeorm';
import {VideoSql} from './video.sql';
import {VIDEO_SOURCE} from '@internal/shared/model/video.model';

@Injectable()
export class VideoService {

	constructor(
		@InjectConnection(CONNECTION_NAME.TASK_DB) private connection: Connection,
		private videoSql: VideoSql,
	) {
	}

	public async createVideo(payload: { url: string, author: string, source: VIDEO_SOURCE }): Promise<{ isSuccess: boolean }> {
		await this.videoSql.createVideo(payload, this.connection.manager);
		return {isSuccess: true};
	}
}
