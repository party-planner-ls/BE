//import bcryptjs
const bcrypt = require("bcryptjs");

//import db
const db = require("../db/dbConfig.js");

//create router
const express = require("express");
const router = express.Router;

//Register Endpoint
// router.post("/register", async (req, res) => {
//   const credentials = req.body;

//   //Convert password string to hash and set the hashed password
//   //As the new password being sent to the DB
//   const hash = bcrypt.hashSync(credential.password, 10);
//   credentials.password = hash;

//   try {
//     const newAccount = await db("users")
//       .insert(credentials)
//       .then(ids => {
//         return getAccountById;
//       });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
