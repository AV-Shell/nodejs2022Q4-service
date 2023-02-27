import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() userDto: CreateUserDto) {
    return await this.authService.signup(userDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() userDto: CreateUserDto) {
    return await this.authService.login(userDto);
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() refreshDto: RefreshTokenDto) {
    return await this.authService.refresh(refreshDto);
  }
}
