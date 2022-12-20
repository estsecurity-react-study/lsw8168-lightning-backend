import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class NotLoggedInGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return !request.isAuthenticated();
  }
}
