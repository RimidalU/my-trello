import { CommentEntity } from '@src/comments/entities'
import { ListEntity } from '@src/lists/entities'
import { UserEntity } from '@src/users/entities'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('card')
export class CardEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column('int2')
  position: number

  @JoinColumn({ name: 'owner' })
  @ManyToOne(() => UserEntity)
  public owner: UserEntity

  @JoinColumn({ name: 'comments' })
  @OneToMany(() => CommentEntity, (comment) => comment.card, { eager: true })
  public comments: CommentEntity[]

  @ManyToOne(() => ListEntity, (list) => list.cards)
  list: CardEntity

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date
}
