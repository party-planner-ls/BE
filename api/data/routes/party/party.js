//Import express
const express = require("express");

const knex = require("knex");
const knexConfig = require("../../../../knexfile.js");

const db = knex(knexConfig.development);

//Import models
const partyModel = require("./party-model.js");
const shoppingListModel = require("../shopping_list/shoppingList-model.js");

//Import middleware
const checkToken = require("../../../middleware.js");

//Create Router
const router = express.Router();

//Endpoints
router.get("/", checkToken, async (req, res) => {
  try {
    const parties = await partyModel.getParty();
    res.status(200).json(parties);
  } catch (err) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the parties" });
  }
});

router.get("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  try {
    const party = await partyModel.getPartyById(id);
    if (party) {
      //returns thread with accountName
      res.status(200).json(party);
    } else {
      res.status(404).json({ message: "Invalid ID" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the party" });
  }
});

//List items with specified party id
router.get("/:id/list/items", checkToken, async (req, res) => {
  try {
    //Joins the two tables together, and uses the party_id foreign key to match id of party and returns data
    const shoppingList = await shoppingListModel
      .getShoppingListWithItems()
      .where("l.party_id", req.params.id);
    res.status(200).json(shoppingList);
  } catch (err) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the party" });
  }
});

// //List items with specified party id
// router.get("/:id/list/todo", checkToken, async (req, res) => {
//   try {
//     //Joins the two tables together, and uses the thread_id foreign key to match id of threads and returns data
//     const shoppingList = await shoppingListModel
//       .getShoppingListWithItems()
//       .where("l.id", req.params.id);
//     res.status(200).json(shoppingList);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "We ran into an error retrieving the party" });
//   }
// });

// //List items with specified party id
// router.get("/:id/list/entertainment", checkToken, async (req, res) => {
//   try {
//     //Joins the two tables together, and uses the thread_id foreign key to match id of threads and returns data
//     const shoppingList = await shoppingListModel
//       .getShoppingListWithItems()
//       .where("l.id", req.params.id);
//     res.status(200).json(shoppingList);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "We ran into an error retrieving the party" });
//   }
// });

router.post("/", checkToken, async (req, res) => {
  const party = req.body;
  try {
    const addParty = await partyModel.addParty(party);
    res.status(200).json(addParty);
  } catch (err) {
    res.status(500).json({
      message: "Error adding party"
    });
  }
});

router.delete("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: "missing ID or wrong ID" });
  } else {
    try {
      const deletedParty = await partyModel.deleteParty(id);
      res.status(204).json(deletedParty);
    } catch (err) {
      res.status(500).json({
        message: "Error deleting party"
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
