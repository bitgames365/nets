import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ResultService } from './result.service';
import { Result } from 'src/entitys/result.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result])
  ],
  providers: [ResultService]
})
export class ResultModule {}
