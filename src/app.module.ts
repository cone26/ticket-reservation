import { AppServerConfig } from './app-server-config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';

@Module({
  //config
  imports: [
    AppServerConfig,

    //database
    TypeOrmModule.forRootAsync({
      name: databaseConfig().name,
      inject: [databaseConfig.KEY],
      useFactory: async (config) => config,
    }),

    //module
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
