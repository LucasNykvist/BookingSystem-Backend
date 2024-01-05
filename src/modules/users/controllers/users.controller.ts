import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
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
    const sak = await this.usersService.login(user);
    console.log('token: ', sak);
    res.send(sak).status(HttpStatus.OK);
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
}
