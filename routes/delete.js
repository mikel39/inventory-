const express = require("express");
const { deletePagePost } = require("../controllers/delete");

const router = express.Router();

router.post("/", deletePagePost);

module.exports = router;
