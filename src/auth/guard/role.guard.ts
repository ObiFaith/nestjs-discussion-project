import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../common/enum';
import { AuthenticatedRequest } from './type';
import { ROLE_KEY } from '../../common/decorators/role.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<UserRole>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<AuthenticatedRequest>();

    if (!user) {
      return false;
    }

    return user.role === requiredRole;
  }
}
