import { CardEntity } from '@src/cards/entities'
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

@Entity('list')
export class ListEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('int2')
  position: number

  @JoinColumn({ name: 'owner' })
  @ManyToOne(() => UserEntity)
  public owner: UserEntity

  @JoinColumn({ name: 'cards' })
  @OneToMany(() => CardEntity, (card) => card.list, { eager: true })
  public cards: CardEntity[]

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date
}
