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
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Roles } from 'src/roles.decorator';
import { UserRoles } from 'src/users/enums/user.enum';
import { UsersService } from 'src/users/users.service';
import { AuthenticationService } from './authentication.service';
import { LoggedInGuard } from './cookieAuthentication.guard';
import EditDto from './dto/edit.dto';
import RegisterDto from './dto/register.dto';
import { LocalGuard } from './local.guard';
import { NotLoggedInGuard } from './not-logged-in.guard';

@ApiTags('Auth')
@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(NotLoggedInGuard)
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
    if (request.isAuthenticated()) {
      return request.user;
    }
  }

  @HttpCode(200)
  @UseGuards(LocalGuard)
  @UseGuards(LoggedInGuard)
  @Post('passwordCheck')
  async passwordCheck(@Req() request: Request) {
    if (request.isAuthenticated()) {
      // console.log(request.user);
      return request.user;
    }
  }

  @HttpCode(200)
  @UseGuards(LoggedInGuard)
  @Post('passwordChange')
  async passwordChange(@Body() password: string) {
    return this.authenticationService.passwordChange(password);
  }

  @HttpCode(200)
  @UseGuards(LoggedInGuard)
  @Get()
  async authenticate(@Req() request: Request) {
    if (request.isAuthenticated()) {
      return request.user;
    }
    throw new UnauthorizedException();
  }

  @HttpCode(200)
  @UseGuards(LoggedInGuard)
  @Post('edit')
  async editData(@Body() editData: EditDto) {
    const exists = await this.usersService.emailCheck(editData.email);
    if (!exists) throw new NotFoundException('이메일 정보가 없습니다.');
    return this.usersService.edit(editData);
  }

  // @HttpCode(200)
  // @UseGuards(LoggedInGuard)
  // @Roles(UserRoles.DEFALUT)
  // @Get('test')
  // async test() {
  //   return 'DEFALUT';
  // }

  // @HttpCode(200)
  // @UseGuards(LoggedInGuard)
  // @Roles(UserRoles.ADMIN)
  // @Get('role')
  // async role() {
  //   return 'ADMIN';
  // }

  @Post('check')
  async check() {
    return 'ok';
  }

  // @UseGuards(LoggedInGuard)
  @Get('logout')
  async logOut(@Req() req: Request, @Res() res: Response) {
    console.log(1);
    req.session.destroy(function () {
      res.cookie('connect.sid', '', { maxAge: 0 });
      res.redirect('/');
    });
  }
}
