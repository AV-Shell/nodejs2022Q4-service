import { IsString, IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @ValidateIf((o) => o.artistId !== null)
  @IsString()
  @IsNotEmpty()
  artistId: string | null; // refers to Artist
  @ValidateIf((o) => o.albumId !== null)
  @IsString()
  @IsNotEmpty()
  albumId: string | null; // refers to Album
  @IsNumber()
  duration: number; // integer number
}
