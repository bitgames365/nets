import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer'
import { User } from './user.entity'

@Entity()
export class Task {
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
  type: number;

  @Column()
  level: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDelete: boolean;

  @Column({ default: 0 })
  status: number;

  @OneToOne(type => User)
  @JoinColumn()
  author: User;
}
