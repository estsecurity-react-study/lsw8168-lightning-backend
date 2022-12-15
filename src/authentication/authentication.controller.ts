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
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Roles } from 'src/roles.decorator';
import { UserRoles } from 'src/users/enums/user.enum';
import { UsersService } from 'src/users/users.service';
import { AuthenticationService } from './authentication.service';
import { CookieAuthenticationGuard } from './cookieAuthentication.guard';
import RegisterDto from './dto/register.dto';
import { LocalGuard } from './local.guard';

@ApiTags('Auth')
@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    const exists = await this.usersService.emailCheck(registrationData.email);
    if (exists) throw new ConflictException('Email이 이미 있습니다.');
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalGuard)
  @Post('login')
  async logIn(@Req() request: Request) {
    console.log('login', request.user);
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
  @Roles(UserRoles.DEFALUT)
  @Get('test')
  async test() {
    return 'DEFALUT';
  }

  @HttpCode(200)
  @UseGuards(CookieAuthenticationGuard)
  @Roles(UserRoles.ADMIN)
  @Get('role')
  async role() {
    return 'ADMIN';
  }

  @Post('check')
  async check() {
    return 'ok';
  }

  @HttpCode(200)
  @UseGuards(CookieAuthenticationGuard)
  @Post('logout')
  async logOut(@Req() req: Request, @Res() res: Response) {
    req.session.destroy(function () {
      res.cookie('connect.sid', '', { maxAge: 0 });
      res.redirect('/');
    });
  }
}
