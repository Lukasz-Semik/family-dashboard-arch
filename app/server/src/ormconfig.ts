import { ConnectionOptions } from 'typeorm';
import { EnvService } from './modules/utils/env';

const envService = new EnvService();
const envConfig = envService.read();

const config: ConnectionOptions = {
  type: envConfig.DB_TYPE,
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  username: envConfig.DB_USER,
  password: envConfig.DB_PASSWORD,
  database: envConfig.DB_NAME,
  migrationsRun: true,
  entities: [__dirname + '/entities/**/*{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
  },
  synchronize: false,
  logging: true,
};

export = config;
