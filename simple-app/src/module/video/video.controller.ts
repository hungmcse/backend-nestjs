import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {VideoService} from './video.service';
import {VideoBodyDto, VideoCreateDto} from '@internal/shared/dto/video/video-create.dto';
import {VideoListDto, VideoListResponseDto} from '@internal/shared/dto/video/video-list.dto';
import {PagingRequestDto} from '@internal/shared/dto/paging.dto';

@Controller()
export class VideoController {

	constructor(private videoService: VideoService) {
	}

	@Post(VideoCreateDto.url)
	public async createVideo(
		@Body() body: VideoBodyDto,
	): Promise<{ isSuccess: boolean }> {
		await this.videoService.createVideo({url: body.url, author: body.author, source: body.source});
		return {isSuccess: true};
	}

	@Get(VideoListDto.url)
	public async listVideo(
		@Query() query: PagingRequestDto,
	): Promise<VideoListResponseDto> {
		const rs = await this.videoService.getVideos(query);
		return new VideoListResponseDto(rs.videos, query.page, 0, query.pageSize);
	}
}
