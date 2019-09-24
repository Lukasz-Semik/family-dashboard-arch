import { Module } from '@nestjs/common';

import { RegistrationController } from './controllers';
import { RegistrationService } from './services';

@Module({
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class UserModule {}
