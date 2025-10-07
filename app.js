const express = require("express");
const path = require("path");
const index = require("./routes/index");
const addnew = require("./routes/new");
const update = require("./routes/update");
const deleteModule = require("./routes/delete");
const { env } = process;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use("/", index);
app.use("/new", addnew);
app.use("/edit", update);
app.use("/delete", deleteModule);

app.listen(env.PORT, (err) => err && console.log(err));
