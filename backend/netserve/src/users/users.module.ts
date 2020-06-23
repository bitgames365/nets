import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CryptoUtil } from '../comm/utils/crypto.utils'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entitys/user.entity'
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../users/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, LocalStrategy, JwtStrategy, CryptoUtil],
})
export class UsersModule {}
