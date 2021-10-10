import {Module} from '@nestjs/common';
import {VideoService} from './video.service';
import {VideoSql} from './video.sql';
import {VideoController} from './video.controller';

@Module({
	imports: [VideoModule],
	providers: [
		VideoService,
		VideoSql,
	],
	controllers: [
		VideoController,
	],
	exports: [
		VideoService,
		VideoSql,
	],
})
export class VideoModule {

}
