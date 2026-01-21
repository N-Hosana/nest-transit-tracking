import { Injectable, CanActivate, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../users/entities/user.entity';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    try {
      const request = context.switchToHttp().getRequest() as any;
      const user = request.user as { role?: UserRole };
      if (!user?.role) {
        return false;
      }
      return requiredRoles.includes(user.role);
    } catch {
      return false;
    }
  }
}

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    return req?.user?.role === UserRole.ADMIN;
  }
}
