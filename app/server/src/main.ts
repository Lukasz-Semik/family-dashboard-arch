import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const API_VERSION = 'api/v1';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(API_VERSION);

  const port = process.env.port || 8080;

  await app.listen(port, () => {
    // tslint:disable-next-line no-console
    console.log(`Listening at http://localhost:${port}/${API_VERSION}`);
  });
}

bootstrap();
