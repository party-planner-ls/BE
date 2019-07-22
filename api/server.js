const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const configureRoutes = require("../auth/auth.js");
const partyRoute = require("./data/routes/party/party.js");
const shoppingListRoute = require("./data/routes/shopping_list/shoppingList.js");
const itemsRoute = require("./data/routes/item/item.js");
const todoListRoute = require("./data/routes/todo_list/todoList.js");
const entertainmentRoute = require("./data/routes/entertainment/entertainment");
const todoRoute = require("./data/routes/todo/todo");
const imageRoute = require("./data/routes/image/image.js");

server.use(cors());

// Init Middleware
server.use(express.json({ extended: false }));

server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

server.get("/", (req, res) => {
  res.status(200).json({ hello: "Hello World! Hi Hi" });
});

//This is where images are uploaded
server.use("/uploads", express.static("uploads"));

server.use("/api/auth", configureRoutes);
server.use("/api/party", partyRoute);
server.use("/api/shoppinglist", shoppingListRoute);
server.use("/api/items", itemsRoute);
server.use("/api/todolist", todoListRoute);
server.use("/api/entertainment", entertainmentRoute);
server.use("/api/todo", todoRoute);
server.use("/api/image", imageRoute);

module.exports = server;
