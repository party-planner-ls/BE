const db = require("../../../db/dbConfig.js");

const getTodo = () => {
  return db("todo");
};

const addTodo = todo => {
  return db("todo")
    .insert(todo)
    .then(ids => {
      return getTodoById(ids[0]);
    });
};

const getTodoById = id => {
  return db("todo")
    .where("id", id) //* returns entertainment within array
    .first();
};

const updateTodo = (id, todo) => {
  return db("todo")
    .update(todo)
    .where("id", id) //* returns count of updated
    .then(todo => {
      return getTodoById(id);
    });
};

const deleteTodo = id => {
  return db("todo")
    .where("id", id)
    .del(); //* returns count of deleted
};

module.exports = {
  getTodo,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo
};
