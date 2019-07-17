const express = require("express");
const server = express();
const cors = require("cors");

const configureRoutes = require("../auth/auth.js");
const partyRoute = require("./data/routes/party/party.js");
const shoppingListRoute = require("./data/routes/shopping_list/shoppingList.js");

server.use(cors());

// Init Middleware
server.use(express.json({ extended: false }));

server.get("/", (req, res) => {
  res.status(200).json({ hello: "Hello World! Hi Hi" });
});

server.use("/api/auth", configureRoutes);
server.use("/api/party", partyRoute);
server.use("/api/list", shoppingListRoute);

module.exports = server;