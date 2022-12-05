import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Req,
  Res,
  ConflictException,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthenticationService } from './authentication.service';
import { CookieAuthenticationGuard } from './cookieAuthentication.guard';
import RegisterDto from './dto/register.dto';
import { LocalGuard } from './local.guard';

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    const exists = await this.usersService.getByEmail(registrationData.email);
    if (exists) throw new ConflictException('사용자가 이미 있습니다.');
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalGuard)
  @Post('login')
  async logIn(@Req() request: Request) {
    return request.user;
  }

  @HttpCode(200)
  @UseGuards(CookieAuthenticationGuard)
  @Get()
  async authenticate(@Req() request: Request) {
    return request.user;
  }

  @HttpCode(200)
  @UseGuards(CookieAuthenticationGuard)
  @Post('logout')
  async logOut(@Req() request: Request, @Res() res: Response) {
    request.logOut(() => {
      res.redirect('/');
    });
    request.session.cookie.maxAge = 0;
  }
}
