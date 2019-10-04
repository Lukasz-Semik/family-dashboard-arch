import { Module, Global } from '@nestjs/common';

import { MailsService } from './mails.service';
// import { EnvModule } from '../env';

@Global()
@Module({
  // imports: [EnvModule],
  providers: [MailsService],
  exports: [MailsService],
})
export class MailsModule {}
