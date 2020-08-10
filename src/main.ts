import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './middlewares/exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule , {
    logger: ['error', 'warn'],
  });

  const options = new DocumentBuilder()
    .setTitle('Rokkhi Home Api')
    .setDescription('')
    .setVersion('1.0')
    //.addTag('rokkhi-home')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true    }));
  await app.listen(3000);
}

bootstrap();
