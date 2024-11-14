import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;  // Truy cập vào user từ request.user

    console.log('User in RolesGuard:', user); // Log user để kiểm tra role

    const requiredRoles = this.getRequiredRoles(context); // Lấy quyền yêu cầu từ decorator
    console.log('Required roles:', requiredRoles); // Log quyền yêu cầu

    if (!requiredRoles) {
      return true; // Nếu không có yêu cầu quyền, cho phép tiếp tục
    }

    // Kiểm tra xem role của user có hợp lệ hay không
    if (!requiredRoles.some(role => user?.role === role)) {
      console.log('Access denied. User role:', user?.role);
      throw new ForbiddenException();
    }

    return true;
  }

  private getRequiredRoles(context: ExecutionContext): string[] {
    const handler = context.getHandler();
    return Reflect.getMetadata('roles', handler) || [];
  }
}
