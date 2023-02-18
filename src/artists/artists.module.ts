import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import InMemoryDB from '../db/db';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    {
      provide: 'IInMemoryDB',
      useClass: InMemoryDB,
    },
  ],
})
export class ArtistsModule {}
