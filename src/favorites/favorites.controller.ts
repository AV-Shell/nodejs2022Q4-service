import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrack(@Param('id', ParseUUIDPipe) id: string) {
    const responce = this.favoritesService.addTrack(id);
    if (responce) return responce;

    throw new UnprocessableEntityException();
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    const responce = this.favoritesService.removeTrack(id);
    if (responce) return responce;

    throw new NotFoundException();
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const responce = this.favoritesService.addAlbum(id);
    if (responce) return responce;

    throw new UnprocessableEntityException();
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const responce = this.favoritesService.removeAlbum(id);
    if (responce) return responce;

    throw new NotFoundException();
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtist(@Param('id', ParseUUIDPipe) id: string) {
    const responce = this.favoritesService.addArtist(id);
    if (responce) return responce;

    throw new UnprocessableEntityException();
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    const responce = this.favoritesService.removeArtist(id);
    if (responce) return responce;

    throw new NotFoundException();
  }
}
