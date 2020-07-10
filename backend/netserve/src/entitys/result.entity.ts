import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer'
import { User } from './user.entity'
import { Device } from './device.entity'
import { Task } from './task.entity'

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guid: string;

  @Column()
  type: string;

  @Column()
  content: string;

  @Column({ length: "1024" })
  details: string;

  @Column()
  level: number;

  @Column()
  threat: number;

  @ManyToOne(type => Device)
  device: Device;

  @ManyToOne(type => Task)
  task: Task;
}
