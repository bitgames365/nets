import { Controller,  Get, Post, Body, Request, UseGuards, ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto'
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger'

@Controller("user")
export class UsersController {
  constructor(
    private readonly userService: UsersService
    ) { }
    
  @ApiOperation({summary: '用户注册'})
  @Post('register')
  async register(@Body(new ValidationPipe()) userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @ApiOperation({summary: '用户登录'})
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body(new ValidationPipe()) loginData: LoginUserDto) {
    console.log("login: ", loginData)
    return this.userService.login(loginData);
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({summary: '获取用户配置'})
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
