import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../interfaces/user.interface';

@Entity('user')
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('IDX_USER_NAME', { unique: true })
  @Column({ comment: 'user name' })
  userName: string;
}
