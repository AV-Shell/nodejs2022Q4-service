import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Track } from '../../tracks/entities/track.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';

export type EntityType = 'artist' | 'album' | 'track';

@Entity()
export class Favorites {
  @ApiProperty({
    example: '0eacf73f-b8f9-4970-8e83-6df0606b9e78',
    description: 'track id',
  })
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    type: 'varchar',
    default: null,
  })
  typeId: string;

  @Column({
    type: 'varchar',
    default: null,
  })
  type: EntityType;

  @OneToOne(() => Track, {
    eager: true,
    onDelete: 'CASCADE',
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'typeId' })
  track: Track;

  @OneToOne(() => Album, {
    eager: true,
    onDelete: 'CASCADE',
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'typeId' })
  album: Album;

  @OneToOne(() => Artist, {
    onDelete: 'CASCADE',
    createForeignKeyConstraints: false,
    eager: true,
  })
  @JoinColumn({ name: 'typeId' })
  artist: Artist;
}
