import { Controller,  Get, Post, Body, Request, UseGuards, ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../comm/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../comm/guards/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto'
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@Controller("user")
@ApiTags("用户接口")
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
    return this.userService.login(loginData);
  }

  @ApiOperation({summary: '用户登出'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('loginout')
  async loginout() {
    return this.userService.logout()
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({summary: '获取用户配置'})
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return this.userService.findOneByAccount(req.user.username)
  }
}
