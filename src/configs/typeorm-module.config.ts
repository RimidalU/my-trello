import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

export const getTypeormModuleConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: configService.getOrThrow<'postgres'>('TYPE_ORM_CONNECTION'),
    username: configService.getOrThrow<string>('TYPE_ORM_USER'),
    password: configService.getOrThrow<string>('TYPE_ORM_PASSWORD'),
    database: configService.getOrThrow<string>('TYPE_ORM_DATABASE'),
    port: configService.getOrThrow<number>('TYPE_ORM_PORT'),
    host: configService.getOrThrow<string>('TYPE_ORM_HOST'),
    entities: [__dirname + '../../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,js}'],
    synchronize: false,
    autoLoadEntities: true,
    useUTC: true,
    ssl: configService.getOrThrow<string>('SSL') === 'prod',
  }
}
