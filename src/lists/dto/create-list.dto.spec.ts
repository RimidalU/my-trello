import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

import { CreateListDto } from './create-list.dto'

describe('create-list.dto', () => {
  let dto
  const numberValue = 12
  const stringValue = 'string-value'

  beforeAll(() => {
    dto = {
      name: '',
      position: '',
    }
  })

  it('name field is empty', async () => {
    const ofImportDTO = plainToInstance(CreateListDto, dto)
    const errors = await validate(ofImportDTO)
    expect(errors.map((err) => err.property).includes('name')).toBeTruthy()
  })

  it('name field is not string', async () => {
    dto.name = numberValue
    const ofImportDTO = plainToInstance(CreateListDto, dto)
    const errors = await validate(ofImportDTO)
    expect(errors.map((err) => err.property).includes('name')).toBeTruthy()
  })

  it('name field is correct', async () => {
    dto.name = stringValue
    const ofImportDTO = plainToInstance(CreateListDto, dto)
    const errors = await validate(ofImportDTO)
    expect(errors.map((err) => err.property).includes('name')).toBeFalsy()
  })

  it('position field is empty', async () => {
    const ofImportDTO = plainToInstance(CreateListDto, dto)
    const errors = await validate(ofImportDTO)
    expect(errors.map((err) => err.property).includes('position')).toBeTruthy()
  })

  it('position field is not a number', async () => {
    dto.position = stringValue
    const ofImportDTO = plainToInstance(CreateListDto, dto)
    const errors = await validate(ofImportDTO)
    expect(errors.map((err) => err.property).includes('position')).toBeTruthy()
  })

  it('position field is correct', async () => {
    dto.position = numberValue
    const ofImportDTO = plainToInstance(CreateListDto, dto)
    const errors = await validate(ofImportDTO)
    expect(errors.map((err) => err.property).includes('position')).toBeFalsy()
  })
})
