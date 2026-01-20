import { Injectable } from '@nestjs/common';
import { CanActivate } from '@nestjs/common/interfaces';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../users/entities/user.entity';
import { SetMetadata } from '@nestjs/common';

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
      const request = context.switchToHttp().getRequest();
      const user = request.user;
    return requiredRoles.includes(user?.role);
  }
}
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    return req.user?.role === 'admin';
  }
}

