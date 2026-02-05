export default () => ({
  env: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
  },
  port: parseInt(process.env.PORT ?? '', 10) || 3008,
  appName: process.env.APP_NAME || 'Discussion Forum Project',
  saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10),
});
