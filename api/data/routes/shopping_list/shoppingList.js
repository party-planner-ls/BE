//Import express
const express = require("express");

const knex = require("knex");
const knexConfig = require("../../../../knexfile.js");

const db = knex(knexConfig.development);

//Import models
const shoppingListModel = require("./shoppingList-model");

//Import middleware
const checkToken = require("../../../middleware.js");

//Create Router
const router = express.Router();

//Endpoints
router.get("/", checkToken, async (req, res) => {
  try {
    const shoppingList = await shoppingListModel.getShoppingListWithItems();
    res.status(200).json(shoppingList);
  } catch (err) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the lists" });
  }
});

router.get("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  try {
    const shoppingList = await shoppingListModel.getShoppingListByIdWithItems(
      id
    );
    if (shoppingList) {
      res.status(200).json(shoppingList);
    } else {
      res.status(404).json({ message: "Invalid ID" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the shopping list" });
  }
});

//Adding the party_id is basically the req.body
router.post("/", checkToken, async (req, res) => {
  //party_id === req.body to attach to right party
  const shoppingList = req.body;
  try {
    const addShoppingList = await shoppingListModel.addShoppingList(
      shoppingList
    );
    res.status(200).json(addShoppingList);
  } catch (err) {
    res.status(500).json({
      message: "Error adding shopping list"
    });
  }
});

router.delete("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: "missing ID or wrong ID" });
  } else {
    try {
      const deletedShoppingList = await shoppingListModel.deleteShoppingList(
        id
      );
      res.status(204).json(deletedShoppingList);
    } catch (err) {
      res.status(500).json({
        message: "Error deleting shopping list"
      });
    }
  }
});

router.put("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  try {
    const updatingParty = await partyModel.updateParty(id, req.body);
    if (updatingParty) {
      res.status(200).json(updatingParty);
    } else {
      res.status(404).json({ message: "Error in updating party" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error updating party I'm at the catch"
    });
  }
});

module.exports = router;
