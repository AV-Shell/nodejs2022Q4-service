import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';
import { Favorites } from '../../favorites/entities/favorites.entity';

@Entity()
export class Track {
  @ApiProperty({
    example: '0eacf73f-b8f9-4970-8e83-6df0606b9e78',
    description: 'track id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @ApiProperty({ example: 'Life is shit', description: 'Track name' })
  @Column({
    type: 'varchar',
    default: 'track01',
  })
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'artistId' })
  artist: string | null;

  @ManyToOne(() => Album, (album) => album.tracks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'albumId' })
  album: string | null;

  @ApiProperty({
    example: '0eacf73f-b8f9-4970-8e83-6df0606b9e78',
    description: 'artist id',
  })
  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  artistId: string | null; // refers to Artist

  @ApiProperty({
    example: '0eacf73f-b8f9-4970-8e83-6df0606b9e78',
    description: 'album id',
  })
  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  albumId: string | null; // refers to Album

  @ApiProperty({ example: '180', description: 'track duration' })
  @Column({
    type: 'int',
    default: 0,
  })
  duration: number; // integer number

  @OneToOne(() => Favorites, (favorites) => favorites.track)
  favorites: Favorites;
}
