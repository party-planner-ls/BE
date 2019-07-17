//Import express
const express = require("express");

const knex = require("knex");
const knexConfig = require("../../../../knexfile.js");

const db = knex(knexConfig.development);

//Import models
const todoListModel = require("./todoList-model");

//Import middleware
const checkToken = require("../../../middleware.js");

//Create Router
const router = express.Router();

//Endpoints
router.get("/", checkToken, async (req, res) => {
  try {
    const todoList = await todoListModel.getTodoListWithTodoEnt();
    res.status(200).json(todoList);
  } catch (err) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the lists" });
  }
});

router.get("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  try {
    const todoList = await todoListModel.getTodoListByIdWithTodoEnt(id);
    if (todoList) {
      res.status(200).json(todoList);
    } else {
      res.status(404).json({ message: "Invalid ID" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the todo list" });
  }
});

//Adding the party_id is basically the req.body
router.post("/", checkToken, async (req, res) => {
  //party_id === req.body to attach to right party
  const todoList = req.body;
  try {
    const addTodoList = await todoListModel.addTodoList(todoList);
    res.status(200).json(addTodoList);
  } catch (err) {
    res.status(500).json({
      message: "Error adding shopping list"
    });
  }
});

router.delete("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: "missing ID or wrong ID" });
  } else {
    try {
      const deletedTodoList = await todoListModel.deleteTodoList(id);
      res.status(204).json(deletedTodoList);
    } catch (err) {
      res.status(500).json({
        message: "Error deleting todo list"
      });
    }
  }
});

router.put("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  try {
    const updatingTodo = await todoListModel.updateTodo(id, req.body);
    if (updatingTodo) {
      res.status(200).json(updatingTodo);
    } else {
      res.status(404).json({ message: "Error in updating todo list" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error updating todo list I'm at the catch"
    });
  }
});

module.exports = router;
