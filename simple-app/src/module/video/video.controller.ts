import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {VideoService} from './video.service';
import {VideoBodyDto, VideoCreateDto} from '@internal/shared/dto/video/video-create.dto';
import {VideoListDto, VideoListResponseDto} from '@internal/shared/dto/video/video-list.dto';
import {PagingRequestDto} from '@internal/shared/dto/paging.dto';
import {AuthGuard} from '@nestjs/passport';
import {JWTContent} from '@internal/core/auth/auth.decorator';
import {UserJWTPayload} from '@internal/core/auth/auth.payload';

@Controller()
export class VideoController {

	constructor(private videoService: VideoService) {
	}

	@Post(VideoCreateDto.url)
	@UseGuards(AuthGuard())
	public async createVideo(
		@Body() body: VideoBodyDto,
		@JWTContent() jwt: UserJWTPayload,
	): Promise<{ isSuccess: boolean }> {
		await this.videoService.createVideo({url: body.url, author: jwt.username, source: body.source});
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
