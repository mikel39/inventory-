const { Pool } = require("pg");
const { env } = process;

const pool = new Pool({
  host: env.HOST,
  user: env.USER,
  port: env.DBPORT,
  password: env.PASSWORD,
  database: env.DB,
});

module.exports = pool;
