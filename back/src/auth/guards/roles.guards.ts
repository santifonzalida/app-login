import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

import { AuthService } from '../services/auth.service';

import { Role } from '../models/roles.model';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user_token = request.headers.authorization.replace('Bearer ', '');
    const user: any = this.authService.decodeUserToken(user_token);
    const userRol = user ? user.role : '';
    const isAuth = roles.some((role) => role === userRol);

    if (!isAuth) {
      throw new UnauthorizedException('Not allowed!');
    }
    return isAuth;
  }
}
