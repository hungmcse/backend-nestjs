import {Body, Controller, Post} from '@nestjs/common';
import {VideoService} from './video.service';
import {VideoBodyDto, VideoCreateDto} from '@internal/shared/dto/video/video-create.dto';

@Controller()
export class VideoController {

	constructor(private videoService: VideoService) {
	}

	@Post(VideoCreateDto.url)
	public async login(
		@Body() body: VideoBodyDto,
	): Promise<{isSuccess: boolean}> {
		await this.videoService.createVideo({url: body.url, author: body.author, source: body.source});
		return {isSuccess: true};
	}
}
