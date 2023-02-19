import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { filter, includes, reduce } from 'lodash';
import { Favorites } from './entities/favorites.entity';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Track } from '../tracks/entities/track.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private favoritesRepository: Repository<Favorites>,
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async findAll() {
    const favorites = await this.favoritesRepository.find({
      // relations: ['artist', 'track', 'album'],
      relations: {
        artist: true,
        track: true,
        album: true,
      },
    });

    console.log('favorites', favorites);

    const result = reduce(
      favorites,
      (m, f) => {
        console.log();

        if (f.type === 'artist') {
          m.artists.push(f.artist);
        }
        if (f.type === 'album') {
          m.albums.push(f.album);
        }
        if (f.type === 'track') {
          m.tracks.push(f.track);
        }

        return m;
      },
      {
        artists: [],
        albums: [],
        tracks: [],
      },
    );

    // console.log(result);

    return {
      artists: filter(result.artists, (x) => x),
      albums: filter(result.albums, (x) => x),
      tracks: filter(result.tracks, (x) => x),
    };
  }

  async addTrack(id: string): Promise<Favorites> {
    const track = await this.tracksRepository.findOne({ where: { id } });
    console.log('track', track);
    if (!track) {
      return;
    }

    const existedFavoriteTrack = await this.favoritesRepository.findOne({
      where: { typeId: id, type: 'track' },
    });
    if (existedFavoriteTrack) {
      return existedFavoriteTrack;
    }

    const favoritesTrack = this.favoritesRepository.create({
      typeId: id,
      type: 'track',
    });

    return this.favoritesRepository.save(favoritesTrack);
  }

  async removeTrack(id: string): Promise<Favorites> {
    const favoriteTrack = await this.favoritesRepository.findOne({
      where: { typeId: id, type: 'track' },
    });
    if (!favoriteTrack) {
      return;
    }
    await this.favoritesRepository.delete(favoriteTrack.id);
    return favoriteTrack;
  }

  async addAlbum(id: string): Promise<Favorites> {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (!album) {
      return;
    }

    const existedFavoriteAlbum = await this.favoritesRepository.findOne({
      where: { typeId: id, type: 'album' },
    });
    if (existedFavoriteAlbum) {
      return existedFavoriteAlbum;
    }

    const favoritesAlbum = this.favoritesRepository.create({
      typeId: id,
      type: 'album',
    });

    return this.favoritesRepository.save(favoritesAlbum);
  }

  async removeAlbum(id: string): Promise<Favorites> {
    const favoriteAlbum = await this.favoritesRepository.findOne({
      where: { typeId: id, type: 'album' },
    });
    if (!favoriteAlbum) {
      return;
    }
    await this.favoritesRepository.delete(favoriteAlbum.id);
    return favoriteAlbum;
  }

  async addArtist(id: string): Promise<Favorites> {
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (!artist) {
      return;
    }
    const existedFavoriteArtist = await this.favoritesRepository.findOne({
      where: { typeId: id, type: 'artist' },
    });
    if (existedFavoriteArtist) {
      return existedFavoriteArtist;
    }

    const favoritesArtist = this.favoritesRepository.create({
      typeId: id,
      type: 'artist',
    });

    return this.favoritesRepository.save(favoritesArtist);
  }

  async removeArtist(id: string): Promise<Favorites> {
    const favoriteArtist = await this.favoritesRepository.findOne({
      where: { typeId: id, type: 'artist' },
    });
    if (!favoriteArtist) {
      return;
    }
    await this.favoritesRepository.delete(favoriteArtist.id);
    return favoriteArtist;
  }
}
