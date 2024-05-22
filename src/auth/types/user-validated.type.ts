import { UserEntity } from '@src/users/entities'

export type UserValidatedType = Omit<UserEntity, 'password' | 'hashPassword'>
