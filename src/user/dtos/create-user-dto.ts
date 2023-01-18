import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class createUserDto{

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsArray()
    @IsNotEmpty()
    roles:[string];
}