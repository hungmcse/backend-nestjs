import {LoggerService} from "@nestjs/common";
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {join} from "path";
import { DBLogger } from "@internal/core/db-logger";
import {CONNECTION_NAME} from "@internal/core/definitions";
import {AppEnvironmentService} from "./module/environment/environment.service";

export const typeormModule = (logger: LoggerService) => [
	TypeOrmModule.forRootAsync({
		inject: [AppEnvironmentService],
		name: CONNECTION_NAME.TASK_DB,
		useFactory: async (env: AppEnvironmentService): Promise<TypeOrmModuleOptions> => {
			return <TypeOrmModuleOptions> {
				name: CONNECTION_NAME.TASK_DB,
				logging: true,
				logger: new DBLogger(logger),
				type: "postgres",
				schema: "db",
				host: env.ENVIRONMENT.DB_HOST,
				port: env.ENVIRONMENT.DB_PORT,
				username: env.ENVIRONMENT.DB_USER,
				database: env.ENVIRONMENT.DB_NAME,
				password: env.ENVIRONMENT.DB_PASSWORD,
				entities: [join(__dirname, "/entity/**.entity{.ts,.js}")],
				keepConnectionAlive: true,
				extra: {
					connectionLimit: 10,
				},
			};
		},
	}),
];
