import databaseConfig from '@libs/common/config/database.config';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConcertEntity } from './entities/concert.entity';
import { CreateConcertInDto } from './dto/create-concert-in.dto';
import { Concert } from './interfaces/concert.interface';
import { UpdateConcertIndto } from './dto/update-concert-in.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(ConcertEntity, databaseConfig().name)
    private readonly concertRepository: Repository<ConcertEntity>,
  ) {}

  /**
   * 모든 콘서트 정보 조회
   */
  async getConcerts(): Promise<ConcertEntity[]> {
    return await this.concertRepository.find();
  }

  /**
   * 콘서트 정보 id로 조회
   */
  async getConcertById(concertId: number): Promise<ConcertEntity> {
    return await this.concertRepository.findOneBy({ id: concertId });
  }

  /**
   * 콘서트 정보 등록
   */
  async createConcert(createConcertInDto: CreateConcertInDto) {
    return await this.concertRepository.save({
      ...createConcertInDto,
    } as Concert);
  }

  /**
   * 콘서트 정보 수정
   */
  async updateConcert(
    concertId: number,
    updateConcertInDto: UpdateConcertIndto,
  ) {
    return await this.concertRepository.update(concertId, {
      ...updateConcertInDto,
    } as Concert);
  }

  /**
   * 콘서트 삭제
   */
  async deleteConcert(concertId: number): Promise<void> {
    await this.concertRepository.delete(concertId);
  }
}
