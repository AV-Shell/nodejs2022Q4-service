import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'IvanAvramov', description: 'User login' })
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @ApiProperty({ example: 'AbraShvabra12!@', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
