import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('API Pokedex BFF')
    .setDescription('Back for Frontend (BFF) consumer of the public PokeAPI')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
