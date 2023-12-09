import { Injectable } from "@nestjs/common";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@Injectable()
export class CreateNoteDTOS {
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @IsString()
    @IsNotEmpty()
    readonly content: string

    @IsString()
    @IsNotEmpty()
    readonly author: string
}