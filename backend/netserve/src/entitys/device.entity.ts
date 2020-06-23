import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer'
import { User } from './user.entity'

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  parent_guid: string;

  @Column()
  guid: string;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  user: string;

  @Column()
  password: string;

  @Column()
  password2: string;

  @Column()
  proto: string;

  @Column()
  port: string;

  @Column()
  type: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDelete: boolean;
}
