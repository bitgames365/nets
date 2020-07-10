import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { ResponseData } from '../comm/interfaces/response.interface'
import { Device } from '../entitys/device.entity'

@Injectable()
export class DeviceService extends TypeOrmCrudService<Device>{
    constructor(@InjectRepository(Device) repo){
        super(repo);
    }

    async fetchTask(): Promise<ResponseData> {
        const result = await this.repo.find();
        if (result) {
            return { statusCode: 200, message: 'success', data: result.reverse() }
        }
        else {
            return { statusCode: 204, message: 'not found' };
        }
    }
}
