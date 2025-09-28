const { Pool } = require("pg");

const env = process.env;

const pool = new Pool({
  host: env.HOST,
  user: env.USER,
  port: env.PORT,
  password: env.PASSWORD,
  database: env.DB,
});

module.exports = pool;
