import moduleAlias = require('module-alias');
import * as path from 'path';

moduleAlias.addAlias('@internal/shared', path.resolve(__dirname, '../shared'));
moduleAlias.addAlias('@internal/core', path.resolve(__dirname, '../core'));

import * as accepts from 'fastify-accepts';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {BadRequestException, Logger, ValidationPipe} from '@nestjs/common';
import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import {PROCESS_SIGNAL} from './constant';
import {TinyLogger} from './logger';
import {EnvironmentProvider} from './module/environment/environment.service';
import {readFileSync} from 'fs';
import {FastifyRequest} from 'fastify';
import {ENVIRONMENTS} from '@internal/core/environment/environment.service';
import * as cors from 'fastify-cors';

/**
 * Init application
 */
async function init(): Promise<NestFastifyApplication> {
	const adapter = new FastifyAdapter({
		https: {
			allowHTTP1: true,
			cert: readFileSync(path.resolve('.', './ssl/ssl.cert')),
			key: readFileSync(path.resolve('.', './ssl/ssl.key')),
		},
		http2: true,
		bodyLimit: 1048576, // bytes
	});
	adapter.register(accepts.default);

	if (EnvironmentProvider.useValue.ENVIRONMENT.ENV_PUBLISH_API !== ENVIRONMENTS.PRODUCTION) {
		adapter.register(cors.default, {
			origin: '*',
		});
	}

	adapter.getInstance()
		.addContentTypeParser(
			'application/octet-stream',
			{parseAs: 'string'},
			async (_req: FastifyRequest, body: string) => body,
		);
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		adapter,
		{
			bodyParser: false,
			logger: new TinyLogger('[APP]'),
		});

	app.setGlobalPrefix(EnvironmentProvider.useValue.ENVIRONMENT.APP_BASE_URL);
	app.useGlobalPipes(new ValidationPipe({
		transform: true,
		whitelist: true,
		forbidUnknownValues: true,
		forbidNonWhitelisted: true,
		exceptionFactory: ((error) => {
			Logger.error('Validate error');
			Logger.error(error);
			return new BadRequestException(error);
		}),
	}));

	// Graceful shutdown
	process.on('SIGINT', async () => {
		process.disconnect();
		await app.close();
		Logger.log('Gracefully shutting down...');
		process.exit();
	});

	const API_PORT = EnvironmentProvider.useValue.ENVIRONMENT.API_PORT;

	Logger.log(`Trying to start app on port : ${API_PORT}`);

	await app.init();
	await app.listen(API_PORT, '0.0.0.0', () => {
		Logger.log(`App started on : ${EnvironmentProvider.useValue.ENVIRONMENT.APP_BASE_URL}:${API_PORT}`);
		if (process.send) {
			process.send(PROCESS_SIGNAL.READY);
		}
	});
	return app;
}

(async () => {
	await init();
})();
