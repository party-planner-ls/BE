//Import express
const express = require("express");

const knex = require("knex");
const knexConfig = require("../../../../knexfile.js");

const db = knex(knexConfig.development);

//Import models
const todoModel = require("./todo-model.js");

//Import middleware
const checkToken = require("../../../middleware.js");

//Create Router
const router = express.Router();

//Endpoints
router.get("/", checkToken, async (req, res) => {
  try {
    const todo = await todoModel.getTodo();
    res.status(200).json(todo);
  } catch (err) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the todo" });
  }
});

router.get("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await todoModel.getTodoById(id);
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ message: "Invalid ID" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the todo" });
  }
});

router.post("/", checkToken, async (req, res) => {
  const todo = req.body;
  try {
    const addTodoItem = await todoModel.addTodo(todo);
    console.log("did i make it here");
    res.status(200).json(addTodoItem);
  } catch (err) {
    res.status(500).json({
      message: "Error adding todo"
    });
  }
});

router.delete("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: "missing ID or wrong ID" });
  } else {
    try {
      const deletedTodo = await todoModel.deleteTodo(id);
      res.status(204).json(deletedTodo);
    } catch (err) {
      res.status(500).json({
        message: "Error deleting Todo"
      });
    }
  }
});

router.put("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  try {
    const updatingTodo = await todoModel.updateTodo(id, req.body);
    if (updatingTodo) {
      res.status(200).json(updatingTodo);
    } else {
      res.status(404).json({ message: "Error in updating todo" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error updating todo"
    });
  }
});

module.exports = router;
