const pool = require("./pool");

async function getAllItems(settings) {
  let qry = "SELECT * FROM books ";

  if (settings.order) qry += `ORDER BY ${settings.order} `;

  if (settings.genre.length > 0 && settings.author) {
    qry += `WHERE genre_ids = ${settings.genre} AND author_id = ${settings.author} `;
  } else if (settings.genre.length > 0) {
    qry += `WHERE genre_ids && ARRAY[${settings.genre}] `;
  } else if (settings.author) {
    qry += `WHERE author_id = ${settings.author} `;
  }

  qry += `LIMIT ${settings.limit} OFFSET ${0};`;

  console.log(qry);
  const result = await pool.query(qry);

  return result.rows;
}

async function getAllGenres() {
  const qry = "SELECT * FROM genres ORDER BY tag;";
  const result = await pool.query(qry);
  return result.rows;
}

async function getAllAuthors() {
  const qry = "SELECT * FROM authors ORDER BY tag;";
  const result = await pool.query(qry);
  return result.rows;
}

module.exports = {
  getAllItems,
  getAllGenres,
  getAllAuthors,
};
