import {DTO, METHOD} from '../base.dto';
import {YOUTUBE_PART} from '../../model/video.model';

export class YoutubeVideoResponseDto {
	public items!: Array<{
		id: string,
		snippet: {
			title: string,
			description: string,
		},
		statistics: {
			likeCount: string,
			dislikeCount: string
		}
	}>
}

export interface IYoutubeVideoQueryDto {
	part: YOUTUBE_PART[],
	id: string,
	key: string
}

export class YoutubeVideoDto extends DTO {
	public url = '/video';
	public method = METHOD.GET;
	body: undefined;
	public readonly response!: YoutubeVideoResponseDto;
	public query: IYoutubeVideoQueryDto;

	constructor(query: IYoutubeVideoQueryDto) {
		super();
		this.query = query
	}
}
