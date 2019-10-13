import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { userApi, apiVer } from '@family-dashboard/api-routes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(apiVer);

  const port = process.env.port || 8080;

  await app.listen(port, () => {
    // tslint:disable-next-line no-console
    console.log(`Listening at http://localhost:${port}/${apiVer}`);
  });
}

bootstrap();
