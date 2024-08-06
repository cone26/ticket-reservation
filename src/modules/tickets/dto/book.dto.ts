import { ApiProperty } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';

export class BookDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  seatNumber: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  concertId: number;

  @ApiProperty()
  userId: number;

  static of<T>(this: ClassConstructor<T>, partial?: Partial<T>): T {
    return Object.assign(new this(), partial);
  }
}
