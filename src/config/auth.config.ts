import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.AUTH_JWT_SECRET,
  expires:
    parseInt(
      process.env.AUTH_JWT_TOKEN_EXPIRES_IN ||
        process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
      10,
    ) || 600000,
}));
