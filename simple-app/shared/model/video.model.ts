export interface IVideo {
	url: string;
	author: string;
	description: string,
	title: string,
}

export enum VIDEO_SOURCE {
	YOUTUBE = 'YOUTUBE',
}

export enum YOUTUBE_PART {
	SNIPPET = 'snippet',
	STATISTIC = 'statistics',
}

export const VIDEO_EMBED_URL: { [key in VIDEO_SOURCE]: string } = {
	[VIDEO_SOURCE.YOUTUBE]: 'https://www.youtube.com/embed/',
}
