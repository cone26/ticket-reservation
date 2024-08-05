import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppServer } from './app.server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appServer = new AppServer(app);
  await appServer.init();
  await appServer.run();
}
bootstrap();
