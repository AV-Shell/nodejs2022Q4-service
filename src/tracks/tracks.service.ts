import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(dto: CreateTrackDto): Promise<Track> {
    const track = this.trackRepository.create(dto);

    return this.trackRepository.save(track);
  }

  async findAll(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  async findOne(id: string): Promise<Track> {
    return await this.trackRepository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateTrackDto): Promise<Track> {
    let track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      return;
    }

    track = await this.trackRepository.merge(track, dto);

    return await this.trackRepository.save(track);
  }

  async remove(id: string): Promise<Track> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      return;
    }
    await this.trackRepository.delete(id);
    return track;
  }
}
