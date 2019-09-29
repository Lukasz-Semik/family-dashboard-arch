import { Module } from '@nestjs/common';

import { UserModule } from './modules';
import { EnvModule, DatabaseOrmModule } from './config';

@Module({
  imports: [UserModule, EnvModule, DatabaseOrmModule()],
})
export class AppModule {}
