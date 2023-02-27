import { ApiProperty } from '@nestjs/swagger';

export class ResponceUserDto {
  @ApiProperty({
    example: '29e1699d-6ec9-4432-b4a6-12036be64095',
    description: 'User Id',
  })
  readonly id: string; // uuid v4

  @ApiProperty({ example: 'IvanAbramov', description: 'User login' })
  readonly login: string;

  @ApiProperty({ description: 'user version, increment on update' })
  readonly version: number; // integer number, increments on update

  @ApiProperty({ description: 'user created timestamp' })
  readonly createdAt: number; // timestamp of creation

  @ApiProperty({ description: 'user updated timestamp' })
  readonly updatedAt: number; // timestamp of last update
}
