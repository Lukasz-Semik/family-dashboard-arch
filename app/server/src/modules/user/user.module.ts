import { Module } from '@nestjs/common';

import { MailsModule } from '../mails/mails.module';
import { RegistrationController, RegistrationService } from './registration';

@Module({
  imports: [MailsModule],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class UserModule {}
