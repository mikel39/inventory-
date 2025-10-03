const {
  getAllGenres,
  getAuthorId,
  getGenreId,
  addAuthor,
  addGenre,
  addBook,
} = require("../db/query");

async function createBook(req, res) {
  const genres = await getAllGenres();
  res.render("new", { genres });
}

async function createBookPost(req, res) {
  const item = req.body;
  const bk = { ...item };

  let authorId = await getAuthorId(item.author);
  if (authorId.length < 1) {
    await addAuthor(item.author, item.authorImage);
    authorId = await getAuthorId(item.author);
  }

  bk.authorId = authorId[0].id;

  if (item.genre === "other") {
    await addGenre(item.genrec);
    item.genre = item.genrec;
  }
  const genreId = await getGenreId(item.genre);

  bk.genreId = [genreId[0].id];
  await addBook(bk);

  res.redirect("/");
}

module.exports = {
  createBook,
  createBookPost,
};
