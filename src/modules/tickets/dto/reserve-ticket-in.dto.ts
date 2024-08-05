import { ApiProperty } from '@nestjs/swagger';

export class ReserveTicketInDto {
  @ApiProperty()
  concertId: number;

  @ApiProperty()
  seatNumber: string;

  @ApiProperty()
  userName: string;
}
