import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class CookieAuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('CookieAuthenticationGuard', request.isAuthenticated());
    return request.isAuthenticated();
  }
}
