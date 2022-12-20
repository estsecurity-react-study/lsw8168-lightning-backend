import * as Joi from 'joi';

export const validationSchema = Joi.object({
  APP_PORT: Joi.number().required(),
  APP_NAME: Joi.string().required(),
  API_PREFIX: Joi.string().required(),
  APP_FALLBACK_LANGUAGE: Joi.string().required(),
  APP_HEADER_LANGUAGE: Joi.string().required(),
  FRONTEND_DOMAIN: Joi.string().uri(),
  BACKEND_DOMAIN: Joi.string().uri(),

  DATABASE_TYPE: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_SYNCHRONIZE: Joi.boolean().required(),

  AUTH_JWT_SECRET: Joi.string().required(),
  AUTH_JWT_TOKEN_EXPIRES_IN: Joi.number().required(),
});
