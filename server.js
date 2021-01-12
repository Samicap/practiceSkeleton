// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const userDB = require('./db/helpers/user_helper')

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

const userDbHelpers = userDB(db);  // passes in the DB to the helper and gives us the helper functions

// temp hardcoded user Database

const tempUsers = {
  "userIdOne": {
    userId: 1,
    name: 'Alice'
  },
  "userIdTwo": {
    userId: 2,
    name: 'Kira'
  }
};

const widgets = {
  'widgetOne': {
    name: 'Sprockets',
    userId: 1
  },
  'widgetTwo': {
    name: 'Chains',
    userId: 2
  }
};

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const users = require('./routes/users');
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  // userDbHelpers.getAllUsers().then(data => {
  //   const users = data.rows;
  //   const templateVars = { "widgets": [], "users": users };

  //     // the Express render method to respond to requests by sending back a template, along with an object containing the data the template needs.
  //     res.render("index", templateVars); // ejs is psychic and knows to look in views folder for ejs files
  // })
  // const templateVars = {"users": tempUsers, "widgets": widgets};
  userDbHelpers.getAllUsers().then(data => {
    const users = data.rows;
    console.log(users)
    const templateVars = {"users": users};
    res.render("apple", templateVars);
  })


});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
