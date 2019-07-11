// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./api/db/dev-party.sqlite3"
    },
    migrations: {
      directory: "./api/db/migrations"
    },
    seeds: {
      directory: "./api/db/seeds"
    }
  }
};
