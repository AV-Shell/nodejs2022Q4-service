import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import InMemoryDB from '../db/db';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    {
      provide: 'IInMemoryDB',
      useClass: InMemoryDB,
    },
  ],
})
export class FavoritesModule {}
