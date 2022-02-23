const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Book");
const Book = mongoose.model("books");

router.get("/", async (req, res) => {
	const books = await Book.find({ status: "active" });
	if (books && books.length > 0) {
		res.setHeader("Content-Type", "application/json");
		return res.status(200).json(books);
	}

	return res.status(404).send("No books were found");
});

router.get("/all", async (req, res) => {
	const book = await Book.find();
	if (book) {
		res.setHeader("Content-Type", "application/json");
		return res.status(200).json(book);
	}

	return res.status(404).send("No books were found");
});

module.exports = router;
