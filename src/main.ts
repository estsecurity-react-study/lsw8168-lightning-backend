import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeormStore } from 'connect-typeorm/out';
import { DataSource } from 'typeorm';
import { Session } from './users/entity/session.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const dataSource = app.get(DataSource);
  const sessionRepository = dataSource.getRepository(Session);

  app.use(
    session({
      secret: configService.get('auth.secret'),
      saveUninitialized: false,
      resave: false,
      cookie: {
        httpOnly: true,
        secure: configService.get('app.nodeEnv') !== 'development',
        maxAge: configService.get('auth.expires'),
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(configService.get('app.port'), () => {
      console.log(`Running on Port ${configService.get('app.port')}`);
    });
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
