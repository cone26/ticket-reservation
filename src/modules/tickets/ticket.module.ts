import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { UserEntity } from './entities/user.entity';
import { BookEntity } from './entities/book.entity';
import { BullModule } from '@nestjs/bull';
import databaseConfig from '@libs/common/config/database.config';
import { ConcertEntity } from '../concert/entities/concert.entity';
import { ReserveProcessor } from './reserve-processor';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [ConcertEntity, BookEntity, UserEntity],
      databaseConfig().name,
    ),

    //redis
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),

    // redis queue
    BullModule.registerQueue({
      name: 'reserveTicket',
    }),
  ],
  controllers: [TicketController],
  providers: [TicketService, ReserveProcessor],
})
export class TicketModule {}
