import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Track } from '../../tracks/entities/track.entity';
import { Album } from '../../albums/entities/album.entity';
import { Favorites } from '../../favorites/entities/favorites.entity';

@Entity()
export class Artist {
  @ApiProperty({
    example: '0eacf73f-b8f9-4970-8e83-6df0606b9e78',
    description: 'artist id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @ApiProperty({ example: 'Ivan Abramov', description: 'Artist name' })
  @Column({
    type: 'varchar',
    default: 'Ivan Durak',
  })
  name: string;

  @ApiProperty({ example: 'true', description: 'Do this artist has Grammy' })
  @Column({
    type: 'boolean',
    default: false,
  })
  grammy: boolean;

  @OneToMany(() => Track, (track) => track.artistId)
  tracks: Track[];

  @OneToMany(() => Album, (album) => album.artistId)
  albums: Album[];

  @OneToOne(() => Favorites, (favorites) => favorites.artist)
  favorites: Favorites;
}
