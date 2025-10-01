const {
  getAllItems,
  getAllGenres,
  getAllAuthors,
  GetDetails,
} = require("../db/query");
const settings = require("./settings");

const setNumOfPages = async (count) => {
  const pages = Math.ceil(Number(count[0]?.count) / Number(settings.limit));
  settings.pages = pages;
};

async function iniialPageGEt(req, res) {
  const keys = Object.keys(req.query);

  if (keys.length > 0) {
    if (!req.query.genre) settings.genre = [];

    keys.forEach((key) => {
      const value = req.query[key];
      if (value !== "df") settings[key] = value;
      if (value == "df") settings[key] = "";
    });

    settings.genre = !Array.isArray(settings.genre)
      ? [settings.genre]
      : settings.genre;

    settings.page = 0;
  } else {
    settings.page = req.params.page;
  }

  console.log(settings);

  const items = await getAllItems(settings);
  const genres = await getAllGenres();
  const authors = await getAllAuthors();

  await setNumOfPages(items[0]);
  const books = items[1];

  res.render("index", { books, genres, authors, settings });
}

async function getBookDetails(req, res) {
  const slug = req.params.name;
  let book = await GetDetails(slug);
  book = book[0];

  res.render("bookDetails", { book });
  console.log(book);
}

module.exports = {
  iniialPageGEt,
  getBookDetails,
};
