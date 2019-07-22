// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './api/db/devparty.sqlite3'
    },
    migrations: {
      directory: './api/db/migrations'
    },
    useNullAsDefault: true
  },
};
