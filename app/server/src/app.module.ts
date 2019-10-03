import { Module } from '@nestjs/common';

import { UserModule, EnvModule, DatabaseOrmModule, MailsModule } from './modules';

@Module({
  imports: [UserModule, MailsModule, EnvModule, DatabaseOrmModule()],
})
export class AppModule {}
