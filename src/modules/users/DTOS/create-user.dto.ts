import { Injectable } from "@nestjs/common";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@Injectable()
export class CreateUserDTO {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsString()
    @IsNotEmpty()
    readonly phone: string

    @IsString()
    @IsNotEmpty()
    readonly password: string
}