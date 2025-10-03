const {
  GetDetails,
  updateBook,
  getAuthorId,
  addAuthor,
  getGenreId,
  addGenre,
} = require("../db/query");

async function updatePageGet(req, res) {
  const slug = req.params.slug;
  const details = await GetDetails(slug);
  const book = details[0];

  const date = new Date(book.rdate);
  const stringDate = date.toISOString().split("T")[0];
  book.rdate = stringDate;
  res.render("update", { book });
}

async function updatePagePost(req, res) {
  const id = req.params.id;
  const book = req.body;
  console.log(book);

  let authorId = await getAuthorId(book.author);
  if (authorId.length < 1) {
    await addAuthor(book.author);
    authorId = await getAuthorId(book.author);
  }
  book.authorId = authorId[0].id;

  let genreId = await getGenreId(book.genre);
  if (genreId.length < 1) {
    await addGenre(book.genre);
    genreId = await getGenreId(book.genre);
  }
  book.genreId = [genreId[0].id];

  await updateBook(id, book);

  res.redirect("/");
}

module.exports = { updatePageGet, updatePagePost };
