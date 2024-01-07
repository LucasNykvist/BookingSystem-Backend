import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../services/users.service';
import { User } from 'src/modules/users/entities/user.entity';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return await this.usersService.createUser(user);
  }

  @Post('/login')
  async login(@Body() user: User, @Res() res: Response): Promise<any> {
    const loginInformation = await this.usersService.login(user);

    res.send(loginInformation).status(HttpStatus.OK);
  }

  @Get()
  async getAllUsers(@Res() res: Response): Promise<void> {
    const users = await this.usersService.getAllUsers();

    res.send(users).status(HttpStatus.OK);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return await this.usersService.getUserById(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() user: User): Promise<User> {
    return await this.usersService.updateUser(id, user);
  }
}
