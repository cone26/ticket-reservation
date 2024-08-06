import { ApiProperty } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';

export class ConcertDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  lastColumn: string;

  @ApiProperty()
  lastRow: number;

  @ApiProperty()
  ticketingStartAt: Date;

  static of<T>(this: ClassConstructor<T>, partial?: Partial<T>): T {
    return Object.assign(new this(), partial);
  }
}
