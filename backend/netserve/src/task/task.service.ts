import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Task } from '../entitys/task.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { ResponseData } from '../comm/interfaces/response.interface'
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
    constructor(@InjectRepository(Task)
    private readonly taskRepository: Repository<Task>) {
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
        const result = await this.taskRepository.save(newTask);
        return { statusCode: 200, message: '增加任务成功', data: result };
    }
}
