const db = require("../../../db/dbConfig.js");

const getShoppingList = () => {
  return db("shopping_list as l")
    .join("item as i", "i.shopping_list_id", "=", "l.id")
    .select("l.*", "i.*");
};

const getShoppingListById = id => {
  return getShoppingList().where("i.shopping_list_id", id); //* returns list within array
};

const addShoppingList = list => {
  return db("shopping_list")
    .insert(list)
    .then(ids => {
      return getShoppingListById(ids[0]);
    });
};

const updateShoppingList = (id, list) => {
  return db("shopping_list")
    .update(list)
    .where("id", id) //* returns count of updated
    .then(list => {
      return getShoppingListById(id);
    });
};

const deleteShoppingList = id => {
  return db("shopping_list")
    .where("id", id)
    .del(); //* returns count of deleted
};

module.exports = {
  getShoppingList,
  addShoppingList,
  getShoppingListById,
  updateShoppingList,
  deleteShoppingList
};
