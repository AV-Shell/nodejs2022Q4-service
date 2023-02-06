import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import InMemoryDB from '../db/db';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'IInMemoryDB',
      useClass: InMemoryDB,
    },
  ],
})
export class UsersModule {}
