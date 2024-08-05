import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Concert } from '../interfaces/concert.interface';

@Entity('concert')
export class ConcertEntity implements Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '티켓팅 시작 시간' })
  ticketingStartAt: Date;
}
