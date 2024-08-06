import { AppServerConfigModule } from '../libs/common/src/config/app-server-config.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketModule } from './modules/tickets/ticket.module';
import databaseConfig from '@libs/common/config/database.config';
import { ConcertModule } from './modules/concert/concert.module';

@Module({
  //config
  imports: [
    AppServerConfigModule,

    //database
    TypeOrmModule.forRootAsync({
      name: databaseConfig().name,
      inject: [databaseConfig.KEY],
      useFactory: async (config) => config,
    }),

    //module
    TicketModule,
    ConcertModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
