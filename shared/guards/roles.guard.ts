import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from 'shared/decorators/roles.decorator';
import { Role } from 'shared/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,private jwtService:JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const auth= req.headers['authorization']
    if (auth){
      const info= this.jwtService.decode(auth.split(" ")[1])
      const roles= info["roles"]
      return requiredRoles.some((role) => roles?.includes(role));
    }
    throw new ForbiddenException();
  }
}