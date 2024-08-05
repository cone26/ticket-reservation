import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';

const environment = process.env.NODE_ENV || 'test';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./config/.${environment}.env`,
      isGlobal: true,
      load: [databaseConfig],
    }),
  ],
})
export class AppServerConfig {}
