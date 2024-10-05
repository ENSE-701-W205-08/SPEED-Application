import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  log('Created Nest.js app');

  app.enableCors({
    origin: ['http://localhost:3000', 'https://speed-app-next.vercel.app'], // Allow requests from the Next.js frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Enable credentials if needed
  });
  log('CORS enabled for Nest.js frontend');

  // Enable validation for all routes
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT);
  log('Listening on port ' + (process.env.PORT || 3000));
}
bootstrap();
