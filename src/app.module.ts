import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesGuard } from 'shared/guards/roles.guard';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://asd23:iEwFZ3mRy1VX37SR@cluster0.ymkq9k8.mongodb.net/?retryWrites=true&w=majority'),
      JwtModule.register(
      {
        secret:"secretKey",
        signOptions:{expiresIn:'1d'}
      },
    ),
    AuthModule,UserModule],
  // controllers: [AppController],
  providers: [
      {
        provide: APP_GUARD,
        useClass: RolesGuard,
      },
  ],
})
export class AppModule {}
