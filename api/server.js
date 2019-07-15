const express = require("express");
const server = express();
const cors = require("cors");

server.use(cors());

// Init Middleware
server.use(express.json({ extended: false }));

server.get("/", (req, res) => {
  res.status(200).json({ hello: "Hello World! Hi Hi" });
});

module.exports = server;
