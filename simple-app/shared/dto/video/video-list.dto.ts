import {METHOD} from '../base.dto';
import {IVideo} from '../../model/video.model';
import {PagingDto, PagingRequestDto, PagingResponseDto} from '@internal/shared/dto/paging.dto';

export class VideoListResponseDto extends PagingResponseDto<Pick<IVideo, 'author' | 'url' | 'source'>> {
	constructor(data: Array<Pick<IVideo, 'author' | 'url' | 'source'>>, currentPage: number, totalItems: number, pageSize?: number) {
		super(data, currentPage, totalItems, pageSize);
	}
}

export class VideoListDto extends PagingDto<Pick<IVideo, 'author' | 'url'>> {
	public static url = 'api/video'
	public url = VideoListDto.url;
	public method = METHOD.GET;
	public body: undefined;
	public readonly response!: VideoListResponseDto;

	constructor(public query: PagingRequestDto) {
		super();
	}
}
