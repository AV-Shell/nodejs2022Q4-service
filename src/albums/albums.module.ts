import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import InMemoryDB from '../db/db';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    {
      provide: 'IInMemoryDB',
      useClass: InMemoryDB,
    },
  ],
})
export class AlbumsModule {}
