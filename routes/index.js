const express = require("express");
const { iniialPageGEt } = require("../controllers/index");

const router = express.Router();

router.get("/", (req, res) => res.redirect("/page/0"));
router.get("/page/:page", iniialPageGEt);

module.exports = router;
