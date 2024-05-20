import { config } from 'dotenv'
import { DataSource } from 'typeorm'

config({
  path: `./.env.${process.env.NODE_ENV || 'dev'}`,
})

export default new DataSource({
  type: 'postgres',
  username: process.env.TYPE_ORM_USER,
  password: process.env.TYPE_ORM_PASSWORD,
  database: process.env.TYPE_ORM_DATABASE,
  port: +process.env.TYPE_ORM_PORT,
  host: process.env.TYPE_ORM_HOST,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + 'src/database/migrations/**/*{.ts,js}'],
  useUTC: true,
  ssl: process.env.SSL === 'prod',
})
