import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<string> {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);

  return 'app started';
}

bootstrap();
