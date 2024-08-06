import databaseConfig from '@libs/common/config/database.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConcertEntity } from '../concert/entities/concert.entity';
import { ConcertController } from './concert.controller';
import { ConcertService } from './concert.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConcertEntity], databaseConfig().name)],
  controllers: [ConcertController],
  providers: [ConcertService],
})
export class ConcertModule {}
