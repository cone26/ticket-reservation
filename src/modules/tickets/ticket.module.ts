import databaseConfig from 'src/config/database.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { UserEntity } from './entities/user.entity';
import { ConcertEntity } from './entities/concert.entity';
import { BookEntity } from './entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [ConcertEntity, BookEntity, UserEntity],
      databaseConfig().name,
    ),
  ],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
