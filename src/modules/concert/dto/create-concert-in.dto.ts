import { ApiProperty } from '@nestjs/swagger';

export class CreateConcertInDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  lastColumn: string;

  @ApiProperty()
  lastRow: number;

  @ApiProperty()
  ticketingStartAt: Date;
}
