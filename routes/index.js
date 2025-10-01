const express = require("express");
const { iniialPageGEt, getBookDetails } = require("../controllers/index");

const router = express.Router();

router.get("/", (req, res) => res.redirect("/page/0"));
router.get("/page/:page", iniialPageGEt);
router.get("/book/:name", getBookDetails);

module.exports = router;
