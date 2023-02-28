import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Track } from '../../tracks/entities/track.entity';
import { Favorites } from '../../favorites/entities/favorites.entity';

@Entity()
export class Album {
  @ApiProperty({
    example: '0eacf73f-b8f9-4970-8e83-6df0606b9e78',
    description: 'album id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @ApiProperty({ example: 'IvanAbramov Best', description: 'Album name' })
  @Column({
    type: 'varchar',
    default: 'Songs',
  })
  name: string;

  @ApiProperty({ example: '1990', description: 'Album year' })
  @Column({
    type: 'int',
    default: 1,
  })
  year: number;

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

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'artistId' })
  artist: string | null;

  @OneToMany(() => Track, (track) => track.albumId)
  tracks: Track[];

  @OneToOne(() => Favorites, (favorites) => favorites.album)
  favorites: Favorites;
}
