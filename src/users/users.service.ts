import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { omit, map } from 'lodash';
import { ForbiddenException } from '@nestjs/common/exceptions';
import InMemoryDB from 'src/db/db';

@Injectable()
export class UsersService {
  constructor(@Inject('IInMemoryDB') private db: InMemoryDB) {}

  create(createUserDto: CreateUserDto): UserDto {
    const user = this.db.createUser(createUserDto);
    return omit(user, ['password']);
  }

  findAll(): UserDto[] {
    return map(this.db.getAllUsers(), (user) => omit(user, ['password']));
  }

  findOne(id: string): UserDto | undefined {
    const user = this.db.getUserById(id);
    if (user) {
      return omit(user, ['password']);
    }
  }

  update(id: string, updateUserDto: UpdateUserDto): UserDto | undefined {
    let user = this.db.getUserById(id);
    if (!user) {
      return;
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException();
    }

    user = this.db.updateUser(id, updateUserDto);
    if (user) {
      return omit(user, ['password']);
    }
  }

  remove(id: string): UserDto {
    const user = this.db.deleteUserById(id);
    if (user) {
      return omit(user, ['password']);
    }
  }
}
