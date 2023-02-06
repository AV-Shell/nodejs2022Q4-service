import { v4 as uuid } from 'uuid';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { IInMemoryDB } from './db-interface';
import { map, find, findIndex, filter } from 'lodash';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { FavoriteEntity } from 'src/favorites/entities/favorite.entity';

@Injectable()
class InMemoryDB implements IInMemoryDB {
  private users: UserEntity[] = [];
  private tracks: TrackEntity[] = [];
  private artists: ArtistEntity[] = [];
  private albums: AlbumEntity[] = [];
  private favorites: FavoriteEntity = {
    artists: [],
    albums: [],
    tracks: [],
  };

  private static instance: InMemoryDB;

  constructor() {
    if (!InMemoryDB.instance) {
      InMemoryDB.instance = this;
    }

    return InMemoryDB.instance;
  }

  getAllUsers = () => map(this.users, (x) => x);

  getUserById = (id: string) => find(this.users, (x) => x.id === id);

  createUser = (data: CreateUserDto) => {
    const dateNow = Date.now();

    const user: UserEntity = {
      ...data,
      version: 1,
      createdAt: dateNow,
      updatedAt: dateNow,
      id: uuid(),
    };

    this.users.push(user);

    return user;
  };

  updateUser = (id, data: UpdateUserDto) => {
    const user = find(this.users, (x) => x.id === id);

    if (user) {
      Object.assign(user, {
        password: data.newPassword,
        version: user.version + 1,
        updatedAt: Date.now(),
      });
    }
    return user;
  };

  deleteUserById = (id: string) => {
    const userIndex = findIndex(this.users, (x) => x.id === id);
    let user: UserEntity | undefined = undefined;

    if (~userIndex) {
      user = this.users.splice(userIndex, 1)?.[0];
    }

    return user;
  };

  getAllTracks = () => map(this.tracks, (x) => x);

  getTrackById = (id: string) => find(this.tracks, (x) => x.id === id);

  createTrack = (data: CreateTrackDto) => {
    const track: TrackEntity = {
      ...data,
      id: uuid(),
    };

    this.tracks.push(track);

    return track;
  };

  updateTrack = (id: string, data: UpdateTrackDto) => {
    const track = find(this.tracks, (x) => x.id === id);

    if (track) {
      Object.assign(track, data);
    }
    return track;
  };

  deleteTrackById = (id: string) => {
    const trackIndex = findIndex(this.tracks, (x) => x.id === id);
    let track: TrackEntity | undefined = undefined;

    if (~trackIndex) {
      track = this.tracks.splice(trackIndex, 1)?.[0];
    }

    return track;
  };

  getAllArtists = () => this.artists;

  getArtistById = (id: string) => find(this.artists, (x) => x.id === id);

  createArtist = (data: CreateArtistDto) => {
    const artist: ArtistEntity = {
      ...data,
      id: uuid(),
    };

    this.artists.push(artist);

    return artist;
  };

  updateArtist = (id: string, data: UpdateArtistDto) => {
    const artist = find(this.artists, (x) => x.id === id);

    if (artist) {
      Object.assign(artist, data);
    }
    return artist;
  };

  deleteArtistById = (id: string) => {
    const artistIndex = findIndex(this.artists, (x) => x.id === id);
    let artist: ArtistEntity | undefined = undefined;

    if (~artistIndex) {
      artist = this.artists.splice(artistIndex, 1)?.[0];
    }

    return artist;
  };

  getAllAlbums = () => this.albums;

  getAlbumById = (id: string) => find(this.albums, (x) => x.id === id);

  createAlbum = (data: CreateAlbumDto) => {
    const album: AlbumEntity = {
      ...data,
      id: uuid(),
    };

    this.albums.push(album);

    return album;
  };

  updateAlbum = (id: string, data: UpdateAlbumDto) => {
    const album = find(this.albums, (x) => x.id === id);

    if (album) {
      Object.assign(album, data);
    }
    return album;
  };

  deleteAlbumById = (id: string) => {
    const albumIndex = findIndex(this.albums, (x) => x.id === id);
    let album: AlbumEntity | undefined = undefined;

    if (~albumIndex) {
      album = this.albums.splice(albumIndex, 1)?.[0];
    }

    return album;
  };

  getAllFavorites = () => this.favorites;

  addArtistToFavorites = (id: string) => {
    if (!find(this.favorites.artists, (a) => a === id)) {
      this.favorites.artists.push(id);
    }
    return id;
  };

  addTrackToFavorites = (id: string) => {
    if (!find(this.favorites.tracks, (t) => t === id)) {
      this.favorites.tracks.push(id);
    }

    return id;
  };

  addAlbumToFavorites = (id: string) => {
    if (!find(this.favorites.albums, (a) => a === id)) {
      this.favorites.albums.push(id);
    }

    return id;
  };

  removeTrackFromFavorites = (id: string) => {
    const trackId = find(this.favorites.tracks, (t) => t === id);

    if (trackId) {
      this.favorites.tracks = filter(this.favorites.tracks, (t) => t !== id);
    }

    return trackId;
  };

  removeAlbumFromFavorites = (id: string) => {
    const albumId = find(this.favorites.albums, (a) => a === id);

    if (albumId) {
      this.favorites.albums = filter(this.favorites.albums, (a) => a !== id);
    }

    return albumId;
  };

  removeArtistFromFavorites = (id: string) => {
    const artistId = find(this.favorites.artists, (a) => a === id);

    if (artistId) {
      this.favorites.artists = filter(this.favorites.artists, (a) => a !== id);
    }

    return artistId;
  };
}

export default InMemoryDB;
