import { ListOwnerInfoDTO } from '../dto'
import { ListEntity } from '../entities'

export interface ListEntityWithOwnerInterface extends ListEntity {
  owner: ListOwnerInfoDTO
}
