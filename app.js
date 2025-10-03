const express = require("express");
const path = require("path");
const index = require("./routes/index");
const addnew = require("./routes/new");
const update = require("./routes/update");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", index);
app.use("/new", addnew);
app.use("/edit", update);

app.listen(8000, (err) => err && console.log(err));
