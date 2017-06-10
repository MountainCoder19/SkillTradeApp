// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgre://localhost/skilbuild'
  },


  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
