import {DTO, METHOD} from '../base.dto';
import {IsEnum, IsString} from 'class-validator';
import {VIDEO_SOURCE} from '@internal/shared/model/video.model';

export class VideoBodyDto {
	@IsString()
	public url!: string;

	@IsEnum(VIDEO_SOURCE)
	public source!: VIDEO_SOURCE
}

export class VideoCreateDto extends DTO {
	public static url = 'api/video';
	public readonly url = VideoCreateDto.url;
	public method = METHOD.POST;
	public readonly response!: {isSuccess: boolean};
	public query: undefined;

	constructor(public body: VideoBodyDto) {
		super();
	}
}
