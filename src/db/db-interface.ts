import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';

export interface IInMemoryDB {
  getAllUsers: () => UserEntity[];
  getUserById: (id: string) => UserEntity | undefined;
  createUser: (data: CreateUserDto) => UserEntity;
  updateUser: (id: string, data: UpdateUserDto) => UserEntity | undefined;
  deleteUserById: (id: string) => UserEntity | undefined;

  getAllTracks: () => TrackEntity[];
  getTrackById: (id: string) => TrackEntity | undefined;
  createTrack: (data: CreateTrackDto) => TrackEntity;
  updateTrack: (id: string, data: UpdateTrackDto) => TrackEntity | undefined;
  deleteTrackById: (id: string) => TrackEntity | undefined;
}
