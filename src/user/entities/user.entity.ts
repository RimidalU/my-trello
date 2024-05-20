import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import * as bcrypt from 'bcrypt'

import { IsEmail } from 'class-validator'

const saltOrRounds = 10

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @IsEmail()
  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, saltOrRounds)
  }
}
