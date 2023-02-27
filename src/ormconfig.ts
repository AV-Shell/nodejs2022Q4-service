import { DataSource } from 'typeorm';
import { Album } from './albums/entities/album.entity';
import { Artist } from './artists/entities/artist.entity';
import { Favorites } from './favorites/entities/favorites.entity';
import { Track } from './tracks/entities/track.entity';
import { User } from './users/entities/user.entity';

const myDataSource = new DataSource({
  type: 'postgres',
  // host: process.env.POSTGRES_HOST,
  host: undefined,
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: [User, Artist, Album, Track, Favorites],
  migrations: [__dirname + './migrations/*{.ts, .js}'],
  synchronize: true,
});

export default myDataSource;
