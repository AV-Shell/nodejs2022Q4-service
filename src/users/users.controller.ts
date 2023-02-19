import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponceUserDto } from './dto/responce-user.dto';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 201, type: ResponceUserDto })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({ status: 200, type: [ResponceUserDto] })
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get User by Id' })
  @ApiResponse({ status: 200, type: ResponceUserDto })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.findOne(id);
    if (user) return user;

    throw new NotFoundException();
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 201, type: ResponceUserDto })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, updateUserDto);
    if (user) return user;

    throw new NotFoundException();
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 201, type: ResponceUserDto })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.remove(id);
    if (user) return user;
    throw new NotFoundException();
  }
}
