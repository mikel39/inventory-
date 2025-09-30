const pool = require("./pool");

async function getAllItems(settings) {
  const offset = Number(settings.page) * Number(settings.limit);
  let qry = "SELECT * FROM books ";

  if (settings.genre.length > 0 && settings.author) {
    qry += `WHERE genre_ids && ARRAY[${settings.genre}] AND author_id = ${settings.author} `;
  } else if (settings.genre.length > 0) {
    qry += `WHERE genre_ids && ARRAY[${settings.genre}] `;
  } else if (settings.author) {
    qry += `WHERE author_id = ${settings.author} `;
  }

  const qryCount = qry.replace("*", "COUNT(*)");
  if (settings.order) qry += `ORDER BY ${settings.order} `;
  qry += `LIMIT ${settings.limit} OFFSET ${offset};`;

  const count = await pool.query(qryCount);
  const result = await pool.query(qry);

  return [count.rows, result.rows];
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
