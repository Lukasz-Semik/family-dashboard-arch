import { Module, Global } from '@nestjs/common';

import { MailsService } from './mails.service';

@Global()
@Module({
  providers: [MailsService],
  exports: [MailsService],
})
export class MailsModule {}
