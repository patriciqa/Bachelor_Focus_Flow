import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //enable cors
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  await app.listen(process.env.APP_PORT);
}

bootstrap();
