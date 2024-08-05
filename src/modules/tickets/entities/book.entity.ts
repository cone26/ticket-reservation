import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../interfaces/book.interface';

@Entity('book')
@Index(['seatNumber', 'createdAt', 'concertId'], { unique: true })
@Index(['seatNumber', 'createdAt', 'concertId', 'userId'], { unique: true })
export class BookEntity implements Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '좌석 넘버' })
  seatNumber: string;

  @Column({ comment: '예약 시간' })
  createdAt: Date;

  @Column({ comment: '콘서트 id' })
  concertId: number;

  @Column({ comment: 'user id' })
  userId: number;
}
