/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userDB = require('../db/helpers/user_helper');

// const { Pool } = require('pg');  // DOnt need bacuse ser.erjs its called in


// const pool = new Pool({
//   user: 'vagrant',
//   password: '123',
//   host: 'localhost',
//   database: 'practice'
// });

// pool.connect()
// .then (console.log("connected"))
// .catch (error => console.log("error", error));


module.exports = (db) => {
  const userDbHelpers = userDB(db);

  router.get("/", (req, res) => {
    // db.query(`SELECT * FROM users;`)
    //   .then(data => {
    //     const users = data.rows;
    //     res.json({ users }); // sends data.  have to read as json then change into a list
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });

    userDbHelpers.getAllUsers();
  });

  router.post("/", (req, res) => { // if we have a button we want to send this req to /api/users
    userDbHelpers.addNewUser('Adam', 7);
  });

  return router;
};

