import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/user.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { AlbumEntity } from 'src/albums/entities/album.entity';

export interface IInMemoryDB {
  getAllUsers: () => User[];
  getUserById: (id: string) => User | undefined;
  createUser: (data: CreateUserDto) => User;
  updateUser: (id: string, data: UpdateUserDto) => User | undefined;
  deleteUserById: (id: string) => User | undefined;

  getAllTracks: () => TrackEntity[];
  getTrackById: (id: string) => TrackEntity | undefined;
  createTrack: (data: CreateTrackDto) => TrackEntity;
  updateTrack: (id: string, data: UpdateTrackDto) => TrackEntity | undefined;
  deleteTrackById: (id: string) => TrackEntity | undefined;

  getAllArtists: () => ArtistEntity[];
  getArtistById: (id: string) => ArtistEntity | undefined;
  createArtist: (data: CreateArtistDto) => ArtistEntity;
  updateArtist: (id: string, data: UpdateArtistDto) => ArtistEntity | undefined;
  deleteArtistById: (id: string) => ArtistEntity | undefined;

  getAllAlbums: () => AlbumEntity[];
  getAlbumById: (id: string) => AlbumEntity | undefined;
  createAlbum: (data: CreateAlbumDto) => AlbumEntity;
  updateAlbum: (id: string, data: UpdateAlbumDto) => AlbumEntity | undefined;
  deleteAlbumById: (id: string) => AlbumEntity | undefined;
}
