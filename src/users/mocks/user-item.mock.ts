import { UserEntity } from '../entities'

type userType = Omit<UserEntity, 'hashPassword'>

export const userItem: userType = {
  id: 11,
  name: 'User Name',
  email: 'user@email.com',
  password: '$2a$10$e4O2ybUAsEfQfFiW8r1Ag.00kFv9a/4ZdUZbgrwSjsR7FBzMmHNpO',
  createdAt: new Date(),
}
export const ownerMockId = 123

export const correctUserPassword = 'sdfsdfsdfsf'

export const newItemInfo = {
  name: userItem.name,
  email: userItem.email,
  password: userItem.password,
}
