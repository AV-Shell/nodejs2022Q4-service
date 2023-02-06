import { v4 as uuid } from 'uuid';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { IInMemoryDB } from './db-interface';
import { map, find, findIndex, omit, pick } from 'lodash';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';

@Injectable()
class InMemoryDB implements IInMemoryDB {
  private users: UserEntity[] = [];
  private tracks: TrackEntity[] = [];

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
    const dateNow = Date.now();

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
}

export default InMemoryDB;
