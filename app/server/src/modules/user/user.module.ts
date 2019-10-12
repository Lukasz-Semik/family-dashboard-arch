import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { RegistrationService } from './services';

@Module({
  controllers: [UserController],
  providers: [RegistrationService],
})
export class UserModule {}
