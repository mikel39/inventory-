const express = require("express");
const { iniialPageGEt } = require("../controllers/index");

const router = express.Router();

router.get("/", iniialPageGEt);

module.exports = router;
