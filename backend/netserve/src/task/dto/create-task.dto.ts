import { IsString, IsNotEmpty, MinLength, MaxLength, Matches, IsNumber, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTaskDto {

    @ApiProperty({
        description: '任务名称',
        uniqueItems: true,
    })
    @IsString({ message: '名称必须是字符串' })
    @IsNotEmpty({ message: '名称不能为空' })
    @MinLength(2, { message: '名称大于两位' })
    name: string;

    @ApiProperty({
        description: '针对任务的描述',
        uniqueItems: true,
    })
    @IsString({ message: '描述必须是字符串' })
    @IsNotEmpty({ message: '描述不能为空' })
    @MinLength(2, { message: '描述大于两位' })
    desc: string;

    @ApiProperty({
        description: '任务类型',
        uniqueItems: true,
    })
    @IsNumber()
    @IsNotEmpty({ message: '任务类型' })
    type: number;

    @ApiProperty({
        description: '任务级别',
        uniqueItems: true,
    })
    @IsNumber()
    @IsNotEmpty({ message: '是否是子任务' })
    level: number;

    @ApiProperty({
        description: '设备列表',
        uniqueItems: true,
    })
    @IsArray()
    devices: number[];
}