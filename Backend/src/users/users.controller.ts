import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user-dto.js';
import type { Request, response, Response } from 'express';
import { GoogleLoginDto } from './dto/google-login.dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async loginUser(@Body() createUserDto: CreateUserDto, @Res({passthrough: true}) response : Response) {
    const tokenData = await this.usersService.create(createUserDto);
    response.cookie('access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return { message: 'Authentication successful' };

  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async createUser(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokenData = await this.usersService.login(loginUserDto);
    response.cookie('access_token', tokenData.access_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return { message: 'Authentication successful' };
  }

  @Get("/me")
  getMe(@Req() req : Request) {
    return this.usersService.me(req);
  }


  @Get('logout')
  logout(@Param('id' ) id: string, @Res({ passthrough: true }) response: Response,) {
    response.cookie('access_token', '');
    return {message: "User logged out successfully"}
  }

  @Post('google')
  async loginWithGoogle(@Body() googleLoginDto: GoogleLoginDto, @Res({passthrough: true}) response : Response) {
    const tokenData = await this.usersService.googleLogin(googleLoginDto);
    response.cookie('access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return { message: 'Authentication successful' };
  }
}
