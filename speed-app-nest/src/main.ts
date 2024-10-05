import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  const allowedOrigins = [
    'http://localhost:3000',
    'https://speed-app-next.vercel.app/',
  ];

  app.enableCors({
    origin: allowedOrigins, // Allow requests from the Next.js frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials if needed
  });

  await app.listen(port);
}
bootstrap();
