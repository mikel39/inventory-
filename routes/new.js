const express = require("express");
const { createBook } = require("../controllers/new");

const router = express.Router();

router.get("/", createBook);

module.exports = router;
