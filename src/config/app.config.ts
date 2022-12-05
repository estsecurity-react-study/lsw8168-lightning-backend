export default () => ({
  appSecret: process.env.APP_SECRET,
  appExpired: process.env.JWT_EXPIRATION_TIME,
  appSecure: process.env.SECURE,
});
