import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './shared/interceptor/Response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  //Response interceptors HTTP
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Configurar títulos de documentación
  const options = new DocumentBuilder()
    .setTitle('API Patient Hospital.')
    .setDescription('Hospital patient registry API composed of microservices')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // La ruta en que se sirve la documentación
  SwaggerModule.setup('docs', app, document);

  await app.listen(8080);
}
bootstrap();
