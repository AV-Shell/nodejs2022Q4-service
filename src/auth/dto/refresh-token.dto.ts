import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ example: 'some tocken', description: 'refresh token' })
  @IsString()
  @IsNotEmpty()
  readonly refreshToken: string;
}
