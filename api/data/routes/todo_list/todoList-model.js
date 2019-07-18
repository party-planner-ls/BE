const db = require("../../../db/dbConfig.js");

const getTodoList = () => {
  return db("todo_list");
};

const getTodoListWithTodo = () => {
  return (
    db("todo_list as l")
      .join("todo as t", "t.todo_list_id", "=", "l.id")
      // .join("entertainment as e", "e.todo_list_id", "=", "l.id")
      .select("l.*", "t.*")
  );
};

const getTodoListWithEnt = () => {
  return (
    db("todo_list as l")
      // .join("todo as t", "t.todo_list_id", "=", "l.id")
      .join("entertainment as e", "e.todo_list_id", "=", "l.id")
      .select("l.*", "e.*")
  );
};

const getTodoListById = id => {
  return db("todo_list")
    .where("id", id) //* returns party within array
    .first();
};

const getTodoListByIdWithTodo = id => {
  return getTodoListWithTodo().where("t.todo_list_id", id); //* returns list within array
};

const getTodoListByIdWithEnt = id => {
  return getTodoListWithEnt().where("e.todo_list_id", id); //* returns list within array
};

const addTodoList = list => {
  return db("todo_list")
    .insert(list)
    .then(ids => {
      return getTodoListById(ids[0]);
    });
};

const updateTodoList = (id, list) => {
  return db("todo_list")
    .update(list)
    .where("id", id) //* returns count of updated
    .then(list => {
      return getTodoListById(id);
    });
};

const deleteTodoList = id => {
  return db("todo_list")
    .where("id", id)
    .del(); //* returns count of deleted
};

module.exports = {
  getTodoList,
  addTodoList,
  getTodoListById,
  updateTodoList,
  deleteTodoList,
  getTodoListByIdWithTodo,
  getTodoListByIdWithEnt,
  getTodoListWithEnt,
  getTodoListWithTodo
};
