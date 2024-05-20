import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { initSwagger } from 'app.swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = await app.get(ConfigService)

  const port = +config.get<number>('API_PORT') || 3000

  initSwagger(app)

  await app.listen(port)
}
bootstrap()
