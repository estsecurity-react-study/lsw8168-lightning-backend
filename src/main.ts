import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import appConfig from 'src/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(
    session({
      name: 'APP_SESSION_ID',
      secret: appConfig().appSecret,
      saveUninitialized: false,
      resave: false,
      cookie: {
        httpOnly: true,
        secure: appConfig().appSecure === 'true',
        maxAge: 60 * 1000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(process.env.LOCAL_PORT, () => {
      console.log(`Running on Port ${process.env.LOCAL_PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
