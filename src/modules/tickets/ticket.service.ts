import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReserveTicketInDto } from './dto/reserve-ticket-in.dto';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { BookEntity } from './entities/book.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
import { ConcertEntity } from './entities/concert.entity';
import { User } from './interfaces/user.interface';
import { Book } from './interfaces/book.interface';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(UserEntity, databaseConfig().name)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(BookEntity, databaseConfig().name)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(ConcertEntity, databaseConfig().name)
    private readonly concertRepository: Repository<ConcertEntity>,
    @InjectDataSource(databaseConfig().name)
    private readonly dataSource: DataSource,
  ) {}

  // ckeck lock
  private isLock: boolean;

  /**
   * 예약 가능한 좌석 조회
   */
  async getAvailableSeats(concertId: number) {
    // check concert info
    const concert = await this._getConcertInfo(concertId);
    const reservedTickets = await this.bookRepository.findBy({
      concertId,
    });

    const seatMap = this._createSeatMap(concert.lastRow, concert.lastColumn);

    // filter available seat
    for (const ticket of reservedTickets) {
      const ticketColumn = ticket.seatNumber[0];
      const ticketRow = ticket.seatNumber.slice(1);
      seatMap[ticketColumn] = seatMap[ticketColumn].filter(
        (row) => row !== ticketRow,
      );
    }

    return this._createAvaialbleSeatArray(seatMap);
  }

  /**
   * 유저가 예매한 티켓 조회
   */
  async getTicketsByUserName(
    concertId: number,
    userName: string,
  ): Promise<BookEntity[]> {
    // check user info
    const user = await this._getUserInfo(userName);

    const tickets = await this.bookRepository.find({
      where: {
        userId: user.id,
        concertId,
      },
    });

    //return 값 수정
    return tickets;
  }

  /**
   * 예약된 좌석 조회
   */
  async getReservedickets(concertId: number) {
    // check concert info
    const concert = await this._getConcertInfo(concertId);

    const reservedTickets = await this.bookRepository.find({
      where: {
        concertId: concert.id,
      },
    });

    return reservedTickets;
  }

  /**
   * 티켓 예약
   */
  async reserveTicket(reserveTicketInDto: ReserveTicketInDto) {
    const { concertId, seatNumber, userName } = reserveTicketInDto;
    let createdReservation: BookEntity;
    let concert: ConcertEntity;
    let user: UserEntity;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    this.isLock = true;
    try {
      // check concert info
      concert = await this._getConcertInfo(concertId);

      const now = new Date();
      if (concert.ticketingStartAt > now) {
        throw new InternalServerErrorException({
          message: '티켓 예매를 할 수 있는 시간이 아닙니다.',
        });
      }

      const isReserved = await this.bookRepository.findOne({
        where: {
          concertId: concert.id,
          seatNumber,
        },
      });
      if (isReserved) {
        throw new InternalServerErrorException({
          message: '이미 선점된 좌석입니다.',
        });
      }

      // check user info
      user = await this.userRepository.findOneBy({
        userName,
      });
      if (!user) {
        user = await this.userRepository.save({
          userName,
        } as User);
      }

      createdReservation = await this.bookRepository.save({
        seatNumber,
        createdAt: now,
        concertId: concert.id,
        userId: user.id,
      } as Book);
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException({
        message: e,
      });
    } finally {
      await queryRunner.release();
      this.isLock = false;
    }

    return {
      seatNumber: createdReservation.seatNumber,
      createAt: createdReservation.createdAt,
      concertName: concert.title,
      user: user.userName,
    };
  }

  /**
   * 예약 취소
   */
  async cancelReservation(
    concertId: number,
    seatNumber: string,
  ): Promise<void> {
    const concert = await this._getConcertInfo(concertId);

    const reservedTicket = await this.bookRepository.findOne({
      where: {
        concertId: concert.id,
        seatNumber,
      },
    });

    if (!reservedTicket) {
      throw new InternalServerErrorException({
        message: '예매 내역이 존재하지 않습니다',
      });
    }

    await this.bookRepository.softDelete(reservedTicket.id);
  }

  // =================== private ===================
  private async _getConcertInfo(concertId: number): Promise<ConcertEntity> {
    const concert = await this.concertRepository.findOneBy({ id: concertId });
    if (!concert) {
      throw new InternalServerErrorException({
        message: '콘서트 정보가 존재하지 않습니다.',
      });
    }

    return concert;
  }

  private async _getUserInfo(userName: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({
      userName,
    });

    // check if there's user exists
    if (!user) {
      throw new InternalServerErrorException({
        message: '유저 정보가 존재하지 않습니다.',
      });
    }

    return user;
  }

  private _createSeatMap(lastRow: number, lastColumn: string): any {
    const seatMap = {};
    for (
      let i = 'A'.charCodeAt(0);
      i <= lastColumn.toUpperCase().charCodeAt(0);
      i++
    ) {
      seatMap[i] = new Array(lastRow + 1).fill(1).map((_, i) => i);
    }

    return seatMap;
  }

  private _createAvaialbleSeatArray(seatMap: any): string[] {
    const columns = Object.keys(seatMap);

    return columns.map((column) =>
      seatMap[column].map((row) => `${column}${row}`),
    );
  }
}
