const express = require("express");
const proccess = require("process");

const env = proccess.env;
const app = express();

app.listen(env.PORT, (err) => err && console.log(err));
