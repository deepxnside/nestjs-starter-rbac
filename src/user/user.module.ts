import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([
    {name:"User",schema: UserSchema}
  ])],
  controllers: [UserController],
  providers:[UserService],
  exports:[UserService]
})
export class UserModule {}
