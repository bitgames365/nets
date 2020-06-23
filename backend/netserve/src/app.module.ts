import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nets',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }), UsersModule, TaskModule, DeviceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
