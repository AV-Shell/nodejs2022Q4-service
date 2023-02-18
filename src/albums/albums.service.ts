import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import InMemoryDB from '../db/db';
import { filter } from 'lodash';

@Injectable()
export class AlbumsService {
  constructor(@Inject('IInMemoryDB') private db: InMemoryDB) {}
  create(createAlbumDto: CreateAlbumDto) {
    return this.db.createAlbum(createAlbumDto);
  }

  findAll() {
    return this.db.getAllAlbums();
  }

  findOne(id: string) {
    return this.db.getAlbumById(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.db.updateAlbum(id, updateAlbumDto);
  }

  remove(id: string) {
    const album = this.db.deleteAlbumById(id);

    if (album) {
      const tracks = filter(this.db.getAllTracks(), (t) => t.albumId === id);

      tracks.forEach((t) => {
        this.db.updateTrack(t.id, { albumId: null });
      });
    }

    return album;
  }
}
