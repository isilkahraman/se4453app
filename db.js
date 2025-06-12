const { Client } = require('pg');

function createClient({ host, username, password, dbName }) {
  return new Client({
    host: host,
    port: 5432,
    user: username,
    password: password,
    database: dbName,
    ssl: {
      rejectUnauthorized: false 
    }
  });
}

module.exports = { createClient };

