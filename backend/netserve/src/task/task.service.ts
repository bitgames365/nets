import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { getManager } from 'typeorm';
import { Task } from '../entitys/task.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { ResponseData } from '../comm/interfaces/response.interface'
import { v4 as uuid } from 'uuid';
import { Device } from 'src/entitys/device.entity';
import { DeviceService } from '../device/device.service'
import { async } from 'rxjs/internal/scheduler/async';
import { rejects } from 'assert';

@Injectable()
export class TaskService {
    constructor(@InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
        private readonly deviceService: DeviceService) {
    }

    async create(dto: CreateTaskDto): Promise<ResponseData> {
        let newTask = new Task()
        newTask = { ...dto, ...newTask }
        if (!newTask.guid || newTask.guid === "") {
            newTask.guid = uuid()
        }
        if (!newTask.parent_guid || newTask.parent_guid === "") {
            newTask.parent_guid = uuid()
        }

        const devices = newTask.devices;
        newTask.devices = [];

        await Promise.all(
            devices.map(id => {
                return new Promise(async (resolve, reject) => {
                    await this.deviceService.findOne(id).then(device => {
                        newTask.devices.push(device);
                    }).catch(error => {
                        return { statusCode: 500, message: 'device id error' };
                    });
                    resolve()
                })
            })
        ).then(
            () => {
                //console.log('add over: ')
            }
        )
        const result = await this.taskRepository.save(newTask);
        return { statusCode: 200, message: 'create task success', data: result };
    }

    async findOne(id: number): Promise<ResponseData> {
        const result = await this.taskRepository.findOne(id);
        if (result) {
            return { statusCode: 200, message: '查询任务成功', data: result };
        }
        else {
            return { statusCode: 204, message: '没有这个任务' };
        }

    }

    async fetchTask(): Promise<ResponseData> {
        const entityManager = getManager();
        const result = await entityManager.query(
            'SELECT task.name, task.desc, task.status, COALESCE(SUM(result.threat=0),0) as safe, \
            COALESCE(SUM(result.threat=1),0) as dgr, count(result.threat) as tt \
            FROM task LEFT JOIN result on task.id=result.taskId GROUP BY task.id'
        );
        if (result) {
            return { statusCode: 200, message: 'success', data: result.reverse() }
        }
        else {
            return { statusCode: 204, message: 'not found' };
        }
    }
}
