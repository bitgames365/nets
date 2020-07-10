import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../entitys/task.entity'
import { Device } from '../entitys/device.entity'
import { DeviceService } from '../device/device.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Device])
  ],
  controllers: [TaskController],
  providers: [TaskService, DeviceService]
})
export class TaskModule {}
