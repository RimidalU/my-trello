import { UserEntity } from '@src/users/entities'
import { Request } from 'express'

export type ExpressRequestType = Request & { user?: UserEntity }
