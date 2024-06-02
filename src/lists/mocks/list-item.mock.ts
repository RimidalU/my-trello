import { UserEntity } from '@src/users/entities'
import { ListEntity } from '../entities'
import { CardEntity } from '@src/cards/entities'
import { userItem } from '@src/users/mocks'

export const owner = new UserEntity()
Object.assign(owner, userItem)

export const listItem: ListEntity = {
  id: 33,
  name: 'List Name',
  position: 2,
  cards: [new CardEntity()],
  owner: owner,
  createdAt: new Date(),
}

export const newItemInfo = {
  name: listItem.name,
  position: listItem.position,
}

export const listItemResponse = {
  itemId: listItem.id,
  item: {
    name: listItem.name,
    position: listItem.position,
    createdAt: listItem.createdAt,
  },
  owner: {
    id: listItem.owner.id,
    name: listItem.owner.name,
    email: listItem.owner.email,
    createdAt: listItem.owner.createdAt,
  },
}
