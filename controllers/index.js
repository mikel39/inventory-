const { getAllItems, getAllGenres, getAllAuthors } = require("../db/query");
const settings = require("./settings");

async function iniialPageGEt(req, res) {
  settings.genre = [];

  Object.keys(req.query).forEach((key) => {
    const value = req.query[key];
    if (value !== "df") settings[key] = value;
  });

  settings.genre = !Array.isArray(settings.genre)
    ? [settings.genre]
    : settings.genre;

  const books = await getAllItems(settings);
  const genres = await getAllGenres();
  const authors = await getAllAuthors();

  res.render("index", { books, genres, authors, settings });
}

module.exports = {
  iniialPageGEt,
};
