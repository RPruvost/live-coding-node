const express = require("express");
const router = express.Router();
const wildersController = require("../controllers/wilders");


//Get all Wilders
router.get("/", wildersController.getWilders);

//get a Wilder by his ID
router.get("/:_id", wildersController.getWilderById);

//Create a Wilder
router.post("/create", wildersController.createWilder);

//Update a Wilder
router.patch("/update", wildersController.updateWilder);

//Delete a Wilder
router.delete("/delete", wildersController.deleteWilder);

module.exports = router;
