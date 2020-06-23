import { IsString, IsNotEmpty, MinLength, MaxLength, Matches} from 'class-validator'
import { Match } from '../../comm/decorator/match.docorator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {

    @ApiProperty({
        description: '用户昵称',
        uniqueItems: true,
    })
    @IsString({ message: '昵称不是有效的数据' })
    @IsNotEmpty({ message: '昵称不能为空' })
    @MinLength(2, { message: '昵称至少需要两位' })
    nickName: string;

    @ApiProperty({
        description: '用户名',
        uniqueItems: true,
    })
    @IsString({ message: '不是有效的数据' })
    @IsNotEmpty({ message: '用户名不能为空' })
    @MinLength(3, { message: '用户名至少需要三位' })
    account: string;

    @ApiProperty()
    @IsString({ message: '密码不是有效的数据' })
    @IsNotEmpty({ message: '密码不能为空' })
    @MinLength(6)
    @MaxLength(20)
    /*
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: '密码以数字，字符和符号组成'
    })*/
    password: string;

    @ApiProperty()
    @IsString({ message: '密码不是有效的数据' })
    @IsNotEmpty({ message: '密码不能为空' })
    @Match('password', { message: '两次输入密码不一致，请重试' })
    confirmPassword: string;
}