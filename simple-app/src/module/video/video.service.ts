import {Injectable} from '@nestjs/common';
import {InjectConnection} from '@nestjs/typeorm';
import {CONNECTION_NAME} from '@internal/core/definitions';
import {Connection} from 'typeorm';
import {VideoSql} from './video.sql';
import {IVideo, VIDEO_SOURCE} from '@internal/shared/model/video.model';
import {PagingRequestDto} from '@internal/shared/dto/paging.dto';

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

	public async getVideos(payload: PagingRequestDto): Promise<{ videos: Array<Pick<IVideo, 'author' | 'url' | 'source'>> }> {
		const rs = await this.videoSql.getVideos(payload, this.connection.manager);
		return {videos: rs.videos.map(({url, author, source}) => ({author, url, source}))};
	}
}
