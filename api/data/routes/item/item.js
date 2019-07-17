//Import express
const express = require("express");

const knex = require("knex");
const knexConfig = require("../../../../knexfile.js");

const db = knex(knexConfig.development);

//Import models
const itemModel = require("./item-model.js");

//Import middleware
const checkToken = require("../../../middleware.js");

//Create Router
const router = express.Router();

//Endpoints
router.get("/", checkToken, async (req, res) => {
  try {
    const items = await itemModel.getItems();
    res.status(200).json(items);
  } catch (err) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the items" });
  }
});

router.get("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  try {
    const item = await itemModel.getItemById(id);
    if (item) {
      //returns thread with accountName
      res.status(200).json(item);
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
  const item = req.body;
  try {
    const addItem = await itemModel.addItem(item);
    res.status(200).json(addItem);
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
      const deletedItem = await itemModel.deleteItem(id);
      res.status(204).json(deletedItem);
    } catch (err) {
      res.status(500).json({
        message: "Error deleting item"
      });
    }
  }
});

router.put("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  try {
    const updatingItem = await itemModel.updateItem(id, req.body);
    if (updatingItem) {
      res.status(200).json(updatingItem);
    } else {
      res.status(404).json({ message: "Error in updating item" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error updating item"
    });
  }
});

module.exports = router;
