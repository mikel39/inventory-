const { getAllItems, getAllGenres, getAllAuthors } = require("../db/query");
const settings = require("./settings");

const setNumOfPages = async (count) => {
  const pages = Math.ceil(Number(count[0]?.count) / Number(settings.limit));
  settings.pages = pages;
};

async function iniialPageGEt(req, res) {
  console.log(req.query);
  console.log(settings);
  res.query = req.query;
  if (!req.query.genre) settings.genre = [];

  Object.keys(req.query).forEach((key) => {
    const value = req.query[key];
    if (value !== "df") settings[key] = value;
    if (value == "df") settings[key] = "";
  });

  settings.genre = !Array.isArray(settings.genre)
    ? [settings.genre]
    : settings.genre;
  settings.page = req.params.page;

  const items = await getAllItems(settings);
  const genres = await getAllGenres();
  const authors = await getAllAuthors();

  await setNumOfPages(items[0]);
  const books = items[1];

  res.render("index", { books, genres, authors, settings });
}

module.exports = {
  iniialPageGEt,
};
