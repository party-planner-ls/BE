const db = require("../../../db/dbConfig.js");

const getParty = () => {
  return db("party");
};

const addParty = party => {
  return db("party")
    .insert(party)
    .then(ids => {
      return getPartyById(ids[0]);
    });
};

const getPartyById = id => {
  return db("party")
    .where("id", id) //* returns party within array
    .first();
};

const updateParty = (id, party) => {
  return db("party")
    .update(party)
    .where("id", id) //* returns count of updated
    .then(party => {
      return this.getPartyById(id);
    });
};

const deleteParty = id => {
  return db("party")
    .where("id", id)
    .del(); //* returns count of deleted
};

module.exports = {
  getParty,
  getPartyById,
  addParty,
  updateParty,
  deleteParty
};