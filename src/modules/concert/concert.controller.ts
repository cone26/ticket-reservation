import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UpdateConcertIndto } from './dto/update-concert-in.dto';
import { CreateConcertInDto } from './dto/create-concert-in.dto';
import { ConcertService } from './concert.service';

@Controller('concert')
export class ConcertController {
  constructor(private readonly conecrtService: ConcertService) {}

  @Get()
  async getConcerts() {
    return await this.conecrtService.getConcerts();
  }

  @Get('/:concertId')
  async getConcertById(@Param('concertId') concertId: number) {
    return await this.conecrtService.getConcertById(Number(concertId));
  }

  @Post()
  async createConcert(@Body() createConcertInDto: CreateConcertInDto) {
    return await this.conecrtService.createConcert(createConcertInDto);
  }

  @Put('/:concertId')
  async updateConcert(
    @Query('concertId') concertId: number,
    @Body() updateConcertIndto: UpdateConcertIndto,
  ) {
    return await this.conecrtService.updateConcert(
      Number(concertId),
      updateConcertIndto,
    );
  }

  @Delete('/:concertId')
  async deleteConcert(@Query('concertId') concertId: number): Promise<void> {
    await this.conecrtService.deleteConcert(concertId);
  }
}
