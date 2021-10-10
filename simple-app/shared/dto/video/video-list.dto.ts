import {DTO, METHOD} from '../base.dto';
import {IVideo} from '../../model/video.model';

export class VideoListResponseDto {
	public items!: Array<Pick<IVideo, 'author' | 'url'>>
}

export class VideoListDto extends DTO {
	public url = '/list-video';
	public method = METHOD.GET;
	body: undefined;
	public readonly response = VideoListResponseDto;
	query: undefined;

	constructor() {
		super();
	}
}
