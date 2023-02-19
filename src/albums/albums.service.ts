import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { filter } from 'lodash';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async create(dto: CreateAlbumDto): Promise<Album> {
    const album = await this.albumsRepository.create(dto);

    return this.albumsRepository.save(album);
  }

  async findAll(): Promise<Album[]> {
    return this.albumsRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    return this.albumsRepository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateAlbumDto): Promise<Album> {
    let album = await this.albumsRepository.findOne({ where: { id } });
    if (!album) {
      return;
    }

    album = await this.albumsRepository.merge(album, dto);

    return await this.albumsRepository.save(album);
  }

  // remove(id: string) {
  //   const album = this.db.deleteAlbumById(id);

  //   if (album) {
  //     const tracks = filter(this.db.getAllTracks(), (t) => t.albumId === id);

  //     tracks.forEach((t) => {
  //       this.db.updateTrack(t.id, { albumId: null });
  //     });
  //   }

  //   return album;
  // }
  async remove(id: string): Promise<Album> {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album) {
      return;
    }
    await this.albumsRepository.delete(id);
    return album;
  }
}
