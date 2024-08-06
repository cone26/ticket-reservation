import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';

const environment = process.env.NODE_ENV || 'test';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./config/.${environment}.env`,
      isGlobal: true,
      cache: true,
      load: [databaseConfig],
    }),
  ],
})
export class AppServerConfigModule {}
