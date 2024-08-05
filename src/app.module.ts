import { AppServerConfig } from './app-server-config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AppServerConfig],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
