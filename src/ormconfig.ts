import { DataSource } from 'typeorm';

const configTypeOrm = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [__dirname + '/../**/*.entity{.ts, .js}'],
  migrations: [__dirname + '/../migrations/*{.ts, .js}'],
  synchronize: true,
});

export default configTypeOrm;
