import { Inject, Injectable } from '@nestjs/common';
import InMemoryDB from '../db/db';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(@Inject('IInMemoryDB') private db: InMemoryDB) {}

  create(createTrackDto: CreateTrackDto) {
    return this.db.createTrack(createTrackDto);
  }

  findAll() {
    return this.db.getAllTracks();
  }

  findOne(id: string) {
    return this.db.getTrackById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.db.updateTrack(id, updateTrackDto);
  }

  remove(id: string) {
    return this.db.deleteTrackById(id);
  }
}
