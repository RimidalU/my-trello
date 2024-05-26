import { CardEntity } from '@src/cards/entities'
import { UserEntity } from '@src/users/entities'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  description: string

  @JoinColumn({ name: 'owner' })
  @ManyToOne(() => UserEntity)
  public owner: UserEntity

  @ManyToOne(() => CardEntity, (card) => card.comments)
  card: CardEntity

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date
}
