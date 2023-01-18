import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { createUserDto } from '../dtos/create-user-dto';
import { UserService } from '../services/user.service';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
   
    @Post("/register")
    async createUser(@Body() body: createUserDto){
        const saltRounds=10;
        const hashedPass= await bcrypt.hash(body.password,saltRounds);
        return(await this.userService.create(body.email,hashedPass,body.roles));
    }

    @Post("/login")
    async loginUser(@Body() body){
        return await this.userService.getUser({email:body.email})
    }

    // @Get()
    // findUserByEmail(@Query('email') email:string){
    //     return this.userService.find(email);
    // }
}
