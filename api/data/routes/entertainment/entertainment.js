//Import express
const express = require("express");

const knex = require("knex");
const knexConfig = require("../../../../knexfile.js");

const db = knex(knexConfig.development);

//Import models
const entertainmentModel = require("./entertainment-model");

//Import middleware
const checkToken = require("../../../middleware.js");

//Create Router
const router = express.Router();

//Endpoints
router.get("/", checkToken, async (req, res) => {
  try {
    const entertainment = await entertainmentModel.getEntertainment();
    res.status(200).json(entertainment);
  } catch (err) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the entertainment" });
  }
});

router.get("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  try {
    const entertainment = await entertainmentModel.getEntertainmentById(id);
    if (entertainment) {
      res.status(200).json(entertainment);
    } else {
      res.status(404).json({ message: "Invalid ID" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the entertainment" });
  }
});

router.post("/", checkToken, async (req, res) => {
  const entertainment = req.body;
  try {
    const addEntertainment = await entertainmentModel.addEntertainment(
      entertainment
    );
    res.status(200).json(addEntertainment);
  } catch (err) {
    res.status(500).json({
      message: "Error adding entertainment"
    });
  }
});

router.delete("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: "missing ID or wrong ID" });
  } else {
    try {
      const deletedEntertainment = await entertainmentModel.deleteEntertainment(
        id
      );
      res.status(204).json(deletedEntertainment);
    } catch (err) {
      res.status(500).json({
        message: "Error deleting entertainment"
      });
    }
  }
});

router.put("/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  try {
    const updatingEntertainment = await entertainmentModel.updateEntertainment(
      id,
      req.body
    );
    if (updatingEntertainment) {
      res.status(200).json(updatingEntertainment);
    } else {
      res.status(404).json({ message: "Error in updating entertainment" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error updating entertainment"
    });
  }
});

module.exports = router;
