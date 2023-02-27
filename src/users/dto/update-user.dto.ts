import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'AbraShvabra678&', description: 'Old user password' })
  @IsString()
  @IsNotEmpty()
  readonly oldPassword: string;

  @ApiProperty({ example: 'AbraShvabra07%:', description: 'New user password' })
  @IsString()
  @IsNotEmpty()
  readonly newPassword: string;
}
