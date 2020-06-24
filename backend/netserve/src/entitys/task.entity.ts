import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import { User } from './user.entity'
import { Device } from './device.entity'


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

  @ManyToMany(type => Device)
  @JoinTable()
  categories: Device[];
}
