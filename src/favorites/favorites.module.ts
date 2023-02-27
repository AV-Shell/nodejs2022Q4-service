import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Favorites } from './entities/favorites.entity';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Track } from '../tracks/entities/track.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorites, Album, Artist, Track]),
    AuthModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
