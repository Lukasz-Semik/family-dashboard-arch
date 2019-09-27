import { Module } from '@nestjs/common';

import { RegistrationController, RegistrationService } from './registration';

@Module({
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class UserModule {}
