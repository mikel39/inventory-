const express = require("express");
const { iniialPage, proccessFilters } = require("../controllers/index");

const router = express.Router();

router.get("/", iniialPage);
router.post("/", proccessFilters);

module.exports = router;
