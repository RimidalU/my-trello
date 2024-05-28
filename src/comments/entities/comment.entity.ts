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
  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  public owner: UserEntity

  @ManyToOne(() => CardEntity, (card) => card.comments, { onDelete: 'CASCADE' })
  card: CardEntity

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date
}
