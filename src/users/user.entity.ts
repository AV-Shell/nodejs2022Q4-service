import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ResponceUserDto } from './dto/responce-user.dto';

@Entity()
export class User {
  @ApiProperty({
    example: '0eacf73f-b8f9-4970-8e83-6df0606b9e78',
    description: 'User id',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @ApiProperty({ example: 'IvanAbramov', description: 'User login' })
  @Column({
    type: 'varchar',
    default: 'Ivanko',
  })
  login: string;

  @ApiProperty({ example: 'AbraShvabra74&$', description: 'User password' })
  @Column({
    type: 'varchar',
    default: 'password',
  })
  password: string;

  @Column({
    type: 'int',
    default: 1,
  })
  version: number; // integer number, increments on update

  @Column({
    type: 'timestamp',
    default: '2023-02-19T00:55:30.677Z',
  })
  createdAt: string; // timestamp of creation

  @Column({
    type: 'timestamp',
    default: '2023-02-19T00:55:30.677Z',
  })
  updatedAt: string; // timestamp of last update

  static toResponse(user: User): ResponceUserDto {
    const { id, login, version, createdAt, updatedAt } = user;
    return {
      id,
      login,
      version,
      createdAt: new Date(createdAt).valueOf(),
      updatedAt: new Date(updatedAt).valueOf(),
    };
  }
}
