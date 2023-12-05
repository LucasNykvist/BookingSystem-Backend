import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from "express"
import { UsersService } from '../services/users.service';
import { User } from 'src/modules/users/entities/user.entity';

@Controller("/api/users")
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    //Create a user
    @Post()
    async createUser(@Body() user: User): Promise<User> {
        return await this.usersService.createUser(user)
    }

    //Get all users
    @Get()
    async getAllUsers(@Res() res: Response): Promise<void> {

        const users = await this.usersService.getAllUsers();

        res.send(users)

    }
    //Get Specific user
    @Get(':id')
    async getUserById(@Param("id") id: number): Promise<User> {
        return await this.usersService.getUserById(id)
    }
}
