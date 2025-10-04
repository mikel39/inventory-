const { deleteBook } = require("../db/query");

async function deletePagePost(req, res) {
  const id = Number(req.body.id);
  if (isNaN(id)) return;

  await deleteBook(id);

  res.redirect("/");
}

module.exports = {
  deletePagePost,
};
