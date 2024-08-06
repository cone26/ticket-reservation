import { PartialType } from '@nestjs/swagger';
import { CreateConcertInDto } from './create-concert-in.dto';

export class UpdateConcertIndto extends PartialType(CreateConcertInDto) {}
