import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../shared/entities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectModel("User")
    private readonly userModel: Model<User>) {}

    async create(email:string, password:string, roles:[string]){
        const user = await this.userModel.findOne({ email });
        if (user) {
            throw new HttpException('Email already exists', HttpStatus.CONFLICT);
        }
        await this.userModel.create({email,password,roles});
    }
    
    async getUser(user:object){
        return this.userModel.findOne(user);
    }

}
