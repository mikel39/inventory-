const { getAllItems, getAllGenres, getAllAuthors } = require("../db/query");

async function iniialPage(req, res) {
  const books = await getAllItems(30, 0);
  const genres = await getAllGenres();
  const authors = await getAllAuthors();

  res.render("index", { books, genres, authors });
}

async function proccessFilters(req, res) {
  console.log(req.body);
}

module.exports = {
  iniialPage,
  proccessFilters,
};
