import { Module } from '@nestjs/common';
import { EnvService } from './env.service';

@Module({
  providers: [
    {
      provide: EnvService,
      useValue: new EnvService(),
    },
  ],
  exports: [EnvService],
})
export class EnvModule {}
