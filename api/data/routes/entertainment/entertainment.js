//Import express
const express = require("express");

const knex = require("knex");
const knexConfig = require("../../../../knexfile.js");

const db = knex(knexConfig.development);

//Import models
const entModel = require("./entertainment-model.js");

//Import middleware
const checkToken = require("../../../middleware.js");

//Create Router
const router = express.Router();

//Endpoints
router.get("/", checkToken, async (req, res) => {
  try {
    const ents = await entModel.getEnts();
    res.status(200).json(ents);
  } catch (err) {
    res.status(500).json({
      message: "We ran into an error retrieving the entertainment list"
    });
  }
});

router.get("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  try {
    const ent = await entModel.getEntById(id);
    if (ent) {
      res.status(200).json(ent);
    } else {
      res.status(404).json({ message: "Invalid ID" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the item" });
  }
});

router.post("/", checkToken, async (req, res) => {
  const ent = req.body;
  try {
    const addEnt = await entModel.addEnt(ent);
    res.status(200).json(addEnt);
  } catch (err) {
    res.status(500).json({
      message: "Error adding item"
    });
  }
});

router.delete("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: "missing ID or wrong ID" });
  } else {
    try {
      const deletedEnt = await entModel.deleteEnt(id);
      res.status(204).json(deletedEnt);
    } catch (err) {
      res.status(500).json({
        message: "Error deleting ent"
      });
    }
  }
});

router.put("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  try {
    const updatingEnt = await entModel.updateEnt(id, req.body);
    if (updatingEnt) {
      res.status(200).json(updatingEnt);
    } else {
      res.status(404).json({ message: "Error in updating ent" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error updating ent"
    });
  }
});

module.exports = router;
