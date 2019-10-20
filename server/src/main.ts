import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as fastifyRateLimit from 'fastify-rate-limit';

import { ValidationPipe } from './shared/pipes/validation.pipe';
import { redis } from './shared/utils/redis';
import 'dotenv/config';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const fastify = new FastifyAdapter({ logger: true });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastify,
  );
  fastify.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
    redis,
    whitelist: ['127.0.0.1'],
  });
  app.use(helmet());

  app.use(helmet.noSniff());
  // app.use(
  //   helmet.contentSecurityPolicy({
  //     directives: {
  //       defaultSrc: ["'self'"],
  //       imgSrc: ["'self'"],
  //     },
  //     disableAndroid: true,
  //     setAllHeaders: true,
  //   }),
  // );

  app.use(helmet.ieNoOpen());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  app.listen(3000).then(() => console.log('bootstraped'));
}
bootstrap();
