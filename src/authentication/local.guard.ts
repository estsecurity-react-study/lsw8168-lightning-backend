import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('context', context);
    await super.canActivate(context);

    // initialize the session
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);

    return request;
  }
}
