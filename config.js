const CONFIG = {
  isTest: process.env.NODE_ENV === "test",
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
};

module.exports = CONFIG;
