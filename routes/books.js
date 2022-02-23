const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const common = require("./commonFunctions");

require("../models/Book");
const Book = mongoose.model("books");

router.get("/", async (req, res) => {
	const status = req.query.status;
	let books = await common.getItemsBasedOnStatus(status, Book);

	if (common.checkIfItemsWereFound(books)) {
		res.setHeader("Content-Type", "application/json");
		return res.status(200).json(books);
	}

	return res.status(404).send("No books were found");
});

module.exports = router;
