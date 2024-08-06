import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ReserveTicketInDto } from './dto/reserve-ticket-in.dto';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get('available/:concertId')
  async getAvailableSeats(@Param('concertId') concertId: number) {
    return await this.ticketService.getAvailableSeats(concertId);
  }

  @Get('/:concertId')
  async getTicketsByUserName(
    @Param('concertId') concertId: number,
    @Query('user') user: string,
  ) {
    return await this.ticketService.getTicketsByUserName(concertId, user);
  }

  @Get('reserved/:concertId')
  async getReservedickets(@Param('concertId') concertId: number) {
    return await this.ticketService.getReservedickets(concertId);
  }

  @Post('reserve')
  async reserveTicket(@Body() reserveTicketInDto: ReserveTicketInDto) {
    return await this.ticketService.addReserveUsersToQueue(reserveTicketInDto);
  }

  @Delete('/cancel/:concertId')
  async cancelReservation(
    @Query('concertId') concertId: number,
    @Param('seatNumber') seatNumber: string,
  ): Promise<void> {
    await this.ticketService.cancelReservation(concertId, seatNumber);
  }
}
