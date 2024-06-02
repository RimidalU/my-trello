import { UserEntity } from '@src/users/entities'
import { ListEntity } from '../entities'
import { CardEntity } from '@src/cards/entities'

export const listItem: ListEntity = {
  id: 33,
  name: 'List Name',
  position: 2,
  cards: [new CardEntity()],
  owner: new UserEntity(),
  createdAt: new Date(),
}

export const newItemInfo = {
  name: listItem.name,
  position: listItem.position,
}
