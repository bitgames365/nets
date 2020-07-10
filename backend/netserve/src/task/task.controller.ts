import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { TaskService } from './task.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { ResponseData } from '../comm/interfaces/response.interface'
import { ApiTags, ApiBearerAuth, ApiParam, ApiQuery} from '@nestjs/swagger';
import { JwtAuthGuard } from '../comm/guards/jwt-auth.guard'

@Controller("task")
//@ApiBearerAuth()
//@UseGuards(JwtAuthGuard)
@ApiTags("任务接口")
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) { }

    @Post('create')
    async create(@Body() taskDto: CreateTaskDto) {
        return this.taskService.create(taskDto)
    }

    @Get('fetchbyid')
    @ApiQuery({name:'id', description: '这是任务ID'})
    async fetchById(@Query('id') qid: number, @Query('name') qname: string) {
        return this.taskService.findOne(qid);
    }

    @Get('fetchall')
    async fetchAll() {
        return this.taskService.fetchTask();
    }
}
