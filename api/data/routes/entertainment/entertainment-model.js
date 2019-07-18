const db = require("../../../db/dbConfig.js");

const getEnts = () => {
  return db("entertainment");
};

const addEnt = ent => {
  return db("entertainment")
    .insert(ent)
    .then(ids => {
      return getEntById(ids[0]);
    });
};

const getEntById = id => {
  return db("entertainment")
    .where("id", id) //* returns ent within array
    .first();
};

const updateEnt = (id, ent) => {
  return db("entertainment")
    .update(ent)
    .where("id", id) //* returns count of updated
    .then(ent => {
      return getEntById(id);
    });
};

const deleteEnt = id => {
  return db("entertainment")
    .where("id", id)
    .del(); //* returns count of deleted
};

module.exports = {
  getEnts,
  getEntById,
  addEnt,
  updateEnt,
  deleteEnt
};
