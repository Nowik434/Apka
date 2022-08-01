module.exports = ({ env }) => ({
  host: env('HOST', '185.204.216.77'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
