// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './api/data/plants.db3'
    }
  },

  migrations: {
    directory: './api/data/migrations'
  },

  seeds: {
    directory: './api/data/seeds'
  }
};
