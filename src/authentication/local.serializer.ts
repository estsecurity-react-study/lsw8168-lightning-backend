import { UsersService } from '../users/users.service';
import User from '../users/entity/user.entity';
import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    // console.log('serializeUser', user.id);
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    // console.log('deserializeUser', userId);
    const user = await this.usersService.getById(Number(userId));
    done(null, user);
  }
}
