const db = require("../../../db/dbConfig.js");

const getItems = () => {
  return db("item");
};

const addItem = item => {
  return db("item")
    .insert(item)
    .then(ids => {
      return getItemById(ids[0]);
    });
};

const getItemById = id => {
  return db("item")
    .where("id", id) //* returns item within array
    .first();
};

const updateItem = (id, item) => {
  return db("item")
    .update(item)
    .where("id", id) //* returns count of updated
    .then(item => {
      return getItemById(id);
    });
};

const deleteItem = id => {
  return db("item")
    .where("id", id)
    .del();
  //* returns count of deleted
};

module.exports = {
  getItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem
};
