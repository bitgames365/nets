import { Controller, UseGuards, Get} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud'

import { Device } from '../entitys/device.entity'
import { DeviceService } from './device.service'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../comm/guards/jwt-auth.guard';

@Crud({
    model:{
        type: Device
    }
})

@ApiTags('设备接口')
@Controller('device')
//@UseGuards(JwtAuthGuard)
//@ApiBearerAuth()
export class DeviceController implements CrudController<Device>{
    constructor(public service: DeviceService) {}

    @Get('fetchall')
    async fetchAll() {
        return this.service.fetchTask();
    }
}
