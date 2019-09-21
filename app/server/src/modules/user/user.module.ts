import { Module } from '@nestjs/common';

import { RegistrationController } from './controllers';

@Module({
  controllers: [RegistrationController],
  providers: [],
})
export class UserModule {}
