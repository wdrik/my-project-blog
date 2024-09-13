const path = require('path');
const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  const connections = {
    postgres: {
      connection: (() => {
        const config = parse(env('DATABASE_URL'));
        return {
          connectionString: env('DATABASE_URL'),
          host: config.host,
          port: config.port,
          database: config.database,
          user: config.user,
          password: config.password,
          ssl: {
            rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
          },
          schema: env('DATABASE_SCHEMA', 'public'), // padrão do Heroku
        };
      })(),
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
