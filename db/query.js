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
  const qry = `SELECT b.id as id, b.title AS bookTitle, b.release_date AS rDate, b.description AS bookDescription,
  b.rating AS bookRating, b.pages AS bookPages, b.image_url AS bookImage, a.tag AS author, 
  a.image_url AS authorImage, g.tag AS genreTag 
  FROM books as b LEFT JOIN authors AS a ON b.author_id = a.id 
  LEFT JOIN genres AS g ON g.id = ANY(b.genre_ids) WHERE b.slug LIKE '${slug}'; `;
  const result = await pool.query(qry);
  return result.rows;
}

async function getAuthorId(author) {
  const qry = "SELECT id FROM authors WHERE $1 ILIKE tag";
  const result = await pool.query(qry, [author]);

  return result.rows;
}

async function getGenreId(genre) {
  const qry = "SELECT id FROM genres WHERE $1 ILIKE tag";
  const result = await pool.query(qry, [genre]);

  return result.rows;
}

const getTitle = (wr) => {
  const tag = wr
    .split(" ")
    .map((word) => {
      const start = word[0].toUpperCase();
      const end = word.slice(1);
      return start + end;
    })
    .join(" ");
  return tag;
};

async function addAuthor(author, authorUrl) {
  const slug = author.trim().toLowerCase().replaceAll(" ", "-");
  const tag = getTitle(author);

  const qry = "INSERT INTO authors(slug, tag, image_url) VALUES ($1, $2, $3);";
  await pool.query(qry, [slug, tag, authorUrl]);
}

async function addGenre(genre) {
  const slug = genre.trim().toLowerCase().replaceAll(" ", "-");
  const tag = getTitle(genre);

  const qry = "INSERT INTO genres(tag, tag_slug) VALUES($1, $2)";
  await pool.query(qry, [tag, slug]);
}

async function addBook(book) {
  book.slug = book.title.trim().toLowerCase().replaceAll(" ", "-");
  book.title = getTitle(book.title);

  const qry = `INSERT INTO books 
    (title, release_date, description, rating, slug, pages, genre_ids, author_id, image_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `;

  await pool.query(qry, [
    book.title,
    book.releaseDate,
    book.description,
    book.rating,
    book.slug,
    book.pages,
    book.genreId,
    book.authorId,
    book.imageUrl,
  ]);
}

async function updateBook(id, book) {
  const qry = `UPDATE books SET 
    title = $2,
    release_date = $3,
    description = $4,
    rating = $5,
    slug = $6,
    pages = $7,
    genre_ids = $8,
    author_id = $9,
    image_url = $10
    WHERE id = $1
    `;

  const newBook = { ...book };
  newBook.slug = newBook.title.trim().toLowerCase().replaceAll(" ", "-");

  await pool.query(qry, [
    id,
    newBook.title,
    newBook.date,
    newBook.description,
    newBook.rating,
    newBook.slug,
    newBook.pages,
    newBook.genreId,
    newBook.authorId,
    newBook.image,
  ]);
}

module.exports = {
  getAllItems,
  getAllGenres,
  getAllAuthors,
  GetDetails,
  getAuthorId,
  getGenreId,
  addAuthor,
  addGenre,
  addBook,
  updateBook,
};
