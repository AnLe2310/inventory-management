import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
  constructor() { super(); }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const requiredRoles = this.getRequiredRoles(context);

    if (!requiredRoles) return true;
    if (!requiredRoles.some(role => user?.role === role)) throw new ForbiddenException();

    return true;
  }

  private getRequiredRoles(context: ExecutionContext): string[] {
    const handler = context.getHandler();
    return Reflect.getMetadata('roles', handler) || [];
  }
}
