import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from '../entitys/device.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Device])
  ],
  controllers: [DeviceController],
  providers: [DeviceService]
})
export class DeviceModule {}
