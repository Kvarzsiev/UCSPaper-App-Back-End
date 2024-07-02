import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST || 'localhost',
  port: Number(process.env.PG_PORT || '5432'),
  username: process.env.PG_USER || 'admin',
  password: process.env.PG_PASSWORD || '1234',
  database: process.env.PG_DB || 'postgres',
  synchronize: false,
  logging: [], //'error'
  entities: ['src/entities/**/*.ts', 'dist/src/entities/**/*.js'],
  migrations: ['src/database/migrations/**/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
});
