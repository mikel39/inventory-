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

async function GetDetails(slug) {
  const qry = `SELECT  b.title AS bookTitle, b.release_date AS rDate, b.description AS bookDescription,
  b.rating AS bookRating, b.pages AS bookPages, b.image_url AS bookImage, a.tag AS author, 
  a.image_url AS authorImage, g.tag AS genreTag 
  FROM books as b LEFT JOIN authors AS a ON b.author_id = a.id 
  LEFT JOIN genres AS g ON g.id = ANY(b.genre_ids) WHERE b.slug LIKE '${slug}'; `;
  const result = await pool.query(qry);
  return result.rows;
}

module.exports = {
  getAllItems,
  getAllGenres,
  getAllAuthors,
  GetDetails,
};
