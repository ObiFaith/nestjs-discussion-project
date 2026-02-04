export default () => ({
  env: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  port: parseInt(process.env.PORT ?? '', 10) || 3008,
  appName: process.env.APP_NAME || 'Discussion Forum Project',
});
