import { Module } from '@nestjs/common';

import { UserModule, MailsModule, EnvModule, TokenModule } from './modules';
import { DatabaseOrmModule } from './database-orm.module';

@Module({
  imports: [UserModule, TokenModule, MailsModule, EnvModule, DatabaseOrmModule()],
})
export class AppModule {}
