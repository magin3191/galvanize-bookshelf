'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection:'postgres://localhost/bookshelf_dev',
    migrations:{

    }
  },


  test: {
    client: 'pg',
    connection:'postgres:localhost/bookshelf_test'
  },

  production: {}
};


// module.exports = {
//   development: {
//     client: 'pg',
//     connection: `postgres://localhost:5432/${process.env.DATABASE_NAME}_dev`,
//     migrations: {
//       directory: path.join(__dirname, 'db', 'migrations')
//     }
//   }
// }
