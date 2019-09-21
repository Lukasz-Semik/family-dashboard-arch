import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

import { UserModule } from './modules';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'djpluki',
      password: '',
      database: 'family-dashboard-dev',
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
