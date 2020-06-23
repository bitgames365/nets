import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../entitys/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseData } from '../comm/interfaces/response.interface'
import { CryptoUtil } from '../comm/utils/crypto.utils'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly cryptoUtil: CryptoUtil) {
  }

  async findOneByAccount(account: string): Promise<User> {
    return await this.userRepository.findOne({ account });
  }

  async create(dto: CreateUserDto): Promise<ResponseData> {
    // 检查用户名是否存在
    const existing = await this.findOneByAccount(dto.account);
    if (existing) throw new HttpException('账号已存在', HttpStatus.BAD_REQUEST);

    // 判断密码是否相等s
    //if (dto.password !== dto.confirmPassword) throw new HttpException('两次输入密码不一致，请重试', HttpStatus.BAD_REQUEST);

    // 密码计算哈希
    dto.password = this.cryptoUtil.sha256(dto.password);

    // 通过验证， 插入数据
    let newUser = new User()
    newUser = { ...dto, ...newUser }
    const result = await this.userRepository.save(newUser);
    return { statusCode: 200, message: '注册成功', data: result };
  }

  async validateUser(account: string, password: string): Promise<any> {
    const user = await this.findOneByAccount(account);
    if (user && user.password === this.cryptoUtil.sha256(password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
