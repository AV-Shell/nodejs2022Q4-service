import { IsString, IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  year: number;
  @ValidateIf((o) => o.artistId !== null)
  @IsString()
  @IsNotEmpty()
  artistId: string | null;
}
