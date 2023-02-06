import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import InMemoryDB from 'src/db/db';
import { filter } from 'lodash';

@Injectable()
export class ArtistsService {
  constructor(@Inject('IInMemoryDB') private db: InMemoryDB) {}

  create(createArtistDto: CreateArtistDto) {
    return this.db.createArtist(createArtistDto);
  }

  findAll() {
    return this.db.getAllArtists();
  }

  findOne(id: string) {
    return this.db.getArtistById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.db.updateArtist(id, updateArtistDto);
  }

  remove(id: string) {
    const artist = this.db.deleteArtistById(id);

    if (artist) {
      const tracks = filter(this.db.getAllTracks(), (t) => t.artistId === id);

      tracks.forEach((t) => {
        this.db.updateTrack(t.id, { artistId: null });
      });
    }

    return artist;
  }
}
