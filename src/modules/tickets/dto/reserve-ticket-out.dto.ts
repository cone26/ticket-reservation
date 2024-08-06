import { ApiProperty } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';

export class ReserveTicketOutDto {
  @ApiProperty()
  seatNumber: string;

  @ApiProperty()
  createAt: Date;

  @ApiProperty()
  concertName: string;

  @ApiProperty()
  user: string;

  static of<T>(this: ClassConstructor<T>, partial?: Partial<T>): T {
    return Object.assign(new this(), partial);
  }
}
