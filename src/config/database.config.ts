import { registerAs } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default registerAs('database', () => ({
  type: process.env.DB_TYPE,
  namingStrategy: new SnakeNamingStrategy(),
  charset: 'utf8mb4',
  timezone: 'Z',
  maxQueryExecutionTime: 1000,
  logging: [],
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: ['dist/src/modules/**/entities/*.entity.!(js.map){,+(ts,js)}'],
}));
