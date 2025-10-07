const { Pool } = require("pg");
const { env } = require("process");

const pool = new Pool({
  host: env.HOST,
  user: env.USER,
  port: env.PORT,
  password: env.PASSWORD,
  database: env.DB,
});

module.exports = pool;
