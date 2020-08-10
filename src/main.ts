import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './middlewares/exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule , {
    logger: ['error', 'warn'],
  });

  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true    }));
  await app.listen(3000);
}

bootstrap();
