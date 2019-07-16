const db = require("../../../db/dbConfig.js");

const getShoppingList = () => {
  return db("shopping_list as l")
    .join("item as i", "i.shopping_list_id", "=", "l.id")
    .select("l.*", "i.*");
};

const getPostById = id => {
  return db("posts as p")
    .join("accounts as a", "a.id", "=", "p.account_id")
    .select("p.*", "a.name")
    .where("p.id", id) //* returns Post within array
    .first();
};

module.exports = {
  getShoppingList
};
