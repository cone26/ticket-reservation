import { ApiProperty } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userName: string;

  static of<T>(this: ClassConstructor<T>, partial?: Partial<T>): T {
    return Object.assign(new this(), partial);
  }
}
