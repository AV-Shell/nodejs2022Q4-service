import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import InMemoryDB from 'src/db/db';

@Module({
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: 'IInMemoryDB',
      useClass: InMemoryDB,
    },
  ],
})
export class TracksModule {}
