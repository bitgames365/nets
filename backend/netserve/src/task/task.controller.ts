import { Controller, Get, Post, Body } from '@nestjs/common';
import { TaskService } from './task.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { ResponseData } from '../comm/interfaces/response.interface'

@Controller("task")
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) { }

    @Post('create')
    async create(@Body() taskDto: CreateTaskDto) {
        return this.taskService.create(taskDto)
    }

    @Get('get')
    async tasks() {
        return ""
    }
}
