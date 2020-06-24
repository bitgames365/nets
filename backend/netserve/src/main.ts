import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('网络设备检查工具')
    .setDescription('提供网络设备检查工具接口，验证接口是否符合功能。')
    .setVersion('1.0')
    .addTag('Nets')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
