import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ResponceUserDto } from '../users/dto/responce-user.dto';

import {
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(userDto: CreateUserDto) {
    console.log(userDto);
    const existedUser = await this.usersService.getUserByLogin(userDto.login);
    if (existedUser) {
      throw new BadRequestException();
    }

    return this.usersService.create(userDto);
  }

  async login(userDto: CreateUserDto) {
    const user = await this.usersService.validateUser(userDto);
    return this.generateTokens(user);
  }

  async refresh(refreshDto: RefreshTokenDto) {
    console.log(`Refresh token dto`, refreshDto);
    try {
      const verifyResult = this.jwtService.verify(refreshDto.refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
      });

      const { userId, login } = verifyResult;

      const existedUser = await this.usersService.getUserByLogin(login);
      if (!existedUser || existedUser.id !== userId) {
        throw new UnauthorizedException();
      }

      return this.generateTokens(User.toResponse(existedUser));
    } catch (error) {
      throw new UnauthorizedException({ message: 'User not authorised' });
    }
  }

  private async generateTokens(user: ResponceUserDto) {
    const payload = { userId: user.id, login: user.login };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET_KEY,
        expiresIn: '30m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
        expiresIn: '30d',
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
