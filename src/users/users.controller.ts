import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from "express"
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';

@Controller('users')
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

    //Update Specific User
    @Put(":id")
    async updateUser(@Param("id") id: number, @Body() updatedUser: Partial<User>): Promise<User> {
        return await this.usersService.updateUser(id, updatedUser)
    }

    //Delete specific user
    @Delete("id")
    async deleteUser(@Param("id") id: number): Promise<void> {
        await this.usersService.deleteUser(id)
    }
}
