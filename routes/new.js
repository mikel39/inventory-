const express = require("express");
const { createBook, createBookPost } = require("../controllers/new");

const router = express.Router();

router.get("/", createBook);
router.post("/", createBookPost);

module.exports = router;
