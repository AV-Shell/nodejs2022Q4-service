import { Inject, Injectable } from '@nestjs/common';
import InMemoryDB from 'src/db/db';
import { filter, includes } from 'lodash';

@Injectable()
export class FavoritesService {
  constructor(@Inject('IInMemoryDB') private db: InMemoryDB) {}

  findAll() {
    const fav = this.db.getAllFavorites();

    return {
      artists: filter(this.db.getAllArtists(), (a) =>
        includes(fav.artists, a.id),
      ),
      albums: filter(this.db.getAllAlbums(), (a) => includes(fav.albums, a.id)),
      tracks: filter(this.db.getAllTracks(), (t) => includes(fav.tracks, t.id)),
    };
  }

  addTrack(id: string) {
    const track = this.db.getTrackById(id);

    if (!track) {
      return;
    }
    return this.db.addTrackToFavorites(id);
  }

  addAlbum(id: string) {
    const album = this.db.getAlbumById(id);

    if (!album) {
      return;
    }
    return this.db.addAlbumToFavorites(id);
  }

  addArtist(id: string) {
    const artist = this.db.getArtistById(id);

    if (!artist) {
      return;
    }

    return this.db.addArtistToFavorites(id);
  }

  removeTrack(id: string) {
    return this.db.removeTrackFromFavorites(id);
  }
  removeAlbum(id: string) {
    return this.db.removeAlbumFromFavorites(id);
  }
  removeArtist(id: string) {
    return this.db.removeArtistFromFavorites(id);
  }
}
