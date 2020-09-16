const express = require("express");
const { Router } = require("express");
var path = require('path');
const app = express();
const port = 3000;
var bodyParser = require('body-parser')
const Joi = require("joi")
require("./User/user")
require("./User/function")



const apiRouter = require("./router/api")
const launchRouter = require("./router/launch");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, '/uploads')));
//public file img
app.use("/api", apiRouter)
app.use("/", launchRouter)
app.get("/", function (req, res) {
  res.render("Dashboard")
})

// app.use("*", function (req, res) {
//   return res.render("errors/error-404");
// });



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
