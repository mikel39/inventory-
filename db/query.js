const pool = require("./pool");

async function getAllItems(limit, offset) {
  const qry = `SELECT * FROM books LIMIT ${limit} OFFSET ${offset};`;
  const result = await pool.query(qry);

  return result.rows;
}

async function getAllGenres() {
  const qry = "SELECT * FROM genres;";
  const result = await pool.query(qry);
  return result.rows;
}

async function getAllAuthors() {
  const qry = "SELECT * FROM authors;";
  const result = await pool.query(qry);
  return result.rows;
}

module.exports = {
  getAllItems,
  getAllGenres,
  getAllAuthors,
};
