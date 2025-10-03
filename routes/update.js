const express = require("express");
const route = express.Router();
const { updatePageGet, updatePagePost } = require("../controllers/update");

route.post("/book/:id", updatePagePost);
route.get("/:slug", updatePageGet);

module.exports = route;
