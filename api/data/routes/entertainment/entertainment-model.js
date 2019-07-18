const db = require("../../../db/dbConfig.js");

const getEntertainment = () => {
  return db("entertainment");
};

const addEntertainment = entertainment => {
  return db("entertainment")
    .insert(entertainment)
    .then(ids => {
      return getEntertainmentById(ids[0]);
    });
};

const getEntertainmentById = id => {
  return db("entertainment")
    .where("entertainment", id) //* returns entertainment within array
    .first();
};

const updateEntertainment = (id, item) => {
  return db("entertainment")
    .update(entertainment)
    .where("id", id) //* returns count of updated
    .then(entertainment => {
      return getEntertainmentById(id);
    });
};

const deleteEntertainment = id => {
  return db("entertainment")
    .where("id", id)
    .del(); //* returns count of deleted
};

module.exports = {
  getEntertainment,
  getEntertainmentById,
  addEntertainment,
  updateEntertainment,
  deleteEntertainment
};
