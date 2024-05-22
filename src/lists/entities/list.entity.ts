import { UserEntity } from '@src/users/entities'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('list')
export class ListEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('int2')
  position: number

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity)
  public user_id: UserEntity

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date
}
