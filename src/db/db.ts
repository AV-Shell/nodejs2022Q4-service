import { v4 as uuid } from 'uuid';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { IInMemoryDB } from './db-interface';
import { map, find, findIndex, omit, pick } from 'lodash';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';

@Injectable()
class InMemoryDB implements IInMemoryDB {
  private users: UserEntity[] = [];

  getAllUsers = () => map(this.users, (x) => x);

  getUserById = (id: string) => find(this.users, (x) => x.id === id);

  createUser = (data: CreateUserDto) => {
    const dateNow = Date.now();

    const user: UserEntity = {
      ...data,
      version: 1,
      createdAt: dateNow,
      updatedAt: dateNow,
      id: uuid(),
    };

    this.users.push(user);

    return user;
  };

  updateUser = (id, data: UpdateUserDto) => {
    const user = find(this.users, (x) => x.id === id);

    if (user) {
      Object.assign(user, {
        password: data.newPassword,
        version: user.version + 1,
        updatedAt: Date.now(),
      });
    }
    return user;
  };

  deleteUserById = (id: string) => {
    const userIndex = findIndex(this.users, (x) => x.id === id);
    let user: UserEntity | undefined = undefined;

    if (~userIndex) {
      user = this.users.splice(userIndex, 1)?.[0];
    }

    return user;
  };
}

export default InMemoryDB;
