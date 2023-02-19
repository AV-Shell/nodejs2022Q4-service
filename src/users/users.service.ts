import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponceUserDto } from './dto/responce-user.dto';
import { User } from './entities/user.entity';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponceUserDto> {
    const dateNow: string = new Date().toISOString();
    let user = await this.usersRepository.create({
      ...createUserDto,
      version: 1,
      createdAt: dateNow,
      updatedAt: dateNow,
    });
    user = await this.usersRepository.save(user);
    const userToResponce = User.toResponse(user);

    return userToResponce;
  }

  async findAll(): Promise<ResponceUserDto[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => User.toResponse(user));
  }

  async findOne(id: string): Promise<ResponceUserDto> {
    const user = await this.usersRepository.findOne({ where: { id } });

    return user ? User.toResponse(user) : undefined;
  }

  async update(id: string, dto: UpdateUserDto): Promise<ResponceUserDto> {
    let user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      return;
    }

    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException();
    }

    user = await this.usersRepository.merge(user, {
      version: user.version + 1,
      updatedAt: new Date().toISOString(),
      password: dto.newPassword,
    });

    user = await this.usersRepository.save(user);
    const userToResponce = User.toResponse(user);
    return userToResponce;
  }

  async remove(id: string): Promise<ResponceUserDto> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      return;
    }
    await this.usersRepository.delete(id);
    return User.toResponse(user);
  }
}
