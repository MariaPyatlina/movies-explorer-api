const appConfig = {
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/bitfilmsdb',
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'dev',
  JWT_SECRET: process.env.JWT_SECRET || 'Some_secret_phrase',
};

module.exports = { appConfig };
