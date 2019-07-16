const express = require("express");
const server = express();
const cors = require("cors");

const configureRoutes = require('../auth/auth');
// const partyRoute = require('./data/routes/party/party');

server.use(cors());

// Init Middleware
server.use(express.json({ extended: false }));


server.get("/", (req, res) => {
  res.status(200).json({ hello: "Hello World! Hi Hi" });
});

server.use('/api/auth', configureRoutes)
// server.use('/api/party', partyRoute)


module.exports = server;
