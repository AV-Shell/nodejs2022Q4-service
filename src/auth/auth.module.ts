import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  imports: [forwardRef(() => UsersModule)],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
