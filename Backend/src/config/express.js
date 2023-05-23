const express = require("express");
const routes = require("../router");
const path = require("path");
const cors = require("cors");
const app = express();
// const passportSetup = require("./passport")x;

app.use(cors());

app.use(express.json());
app.use("/src/file", express.static(path.resolve("./src/file")));

// app.use("/uploads", express.static(`${process.cwd()}/src/file`));
// console.log(process.cwd());

app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", routes);

module.exports = app;

// https://education.github.com/pack
