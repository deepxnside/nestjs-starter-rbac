import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationFilter } from './filters/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule, new FastifyAdapter()
    );
  
  app.useGlobalFilters(
    new ValidationFilter()
  );

  app.useGlobalPipes(
    new ValidationPipe({
    skipMissingProperties:true,
  }));

  await app.listen(3000);
}

bootstrap();
