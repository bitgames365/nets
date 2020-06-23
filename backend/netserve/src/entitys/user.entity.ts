import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickName: string;

  @Column()
  account: string;

  @Exclude({ toPlainOnly: true }) // 输出屏蔽密码
  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
