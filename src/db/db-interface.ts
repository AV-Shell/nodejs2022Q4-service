import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';

export interface IInMemoryDB {
  getAllUsers: () => UserEntity[];
  getUserById: (id: string) => UserEntity | undefined;
  createUser: (data: CreateUserDto) => UserEntity;
  updateUser: (id: string, data: UpdateUserDto) => UserEntity | undefined;
  deleteUserById: (id: string) => UserEntity | undefined;

  getAllTracks: () => TrackEntity[];
  getTrackById: (id: string) => TrackEntity | undefined;
  createTrack: (data: CreateUserDto) => TrackEntity;
  updateTrack: (id: string, data: UpdateUserDto) => TrackEntity | undefined;
  deleteTrackById: (id: string) => TrackEntity | undefined;
}
