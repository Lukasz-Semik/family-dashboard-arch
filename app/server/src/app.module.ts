import { Module } from '@nestjs/common';

import { UserModule, MailsModule, DatabaseOrmModule, EnvModule, TokenModule } from './modules';

@Module({
  imports: [UserModule, TokenModule, MailsModule, EnvModule, DatabaseOrmModule()],
})
export class AppModule {}
