import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
// import { filter } from 'lodash';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(dto: CreateArtistDto): Promise<Artist> {
    const artist = this.artistsRepository.create(dto);

    return this.artistsRepository.save(artist);
  }

  async findAll(): Promise<Artist[]> {
    return this.artistsRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    return this.artistsRepository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateArtistDto): Promise<Artist> {
    let artist = await this.artistsRepository.findOne({ where: { id } });
    if (!artist) {
      return;
    }

    artist = this.artistsRepository.merge(artist, dto);

    return this.artistsRepository.save(artist);
  }

  // remove(id: string) {
  //   const artist = this.db.deleteArtistById(id);

  //   if (artist) {
  //     const tracks = filter(this.db.getAllTracks(), (t) => t.artistId === id);

  //     tracks.forEach((t) => {
  //       this.db.updateTrack(t.id, { artistId: null });
  //     });
  //   }

  //   return artist;
  // }

  async remove(id: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOne({ where: { id } });
    if (!artist) {
      return;
    }
    await this.artistsRepository.delete(id);
    return artist;
  }
}
