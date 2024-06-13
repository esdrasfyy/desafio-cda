import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

const allowedOrigins = ['http://localhost:3000', 'https://github.com'];

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()).use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    }),
  );
  await app.listen(8080);
}
bootstrap();
