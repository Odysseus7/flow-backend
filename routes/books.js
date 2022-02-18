const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Book");
const Book = mongoose.model("books");

router.get("/", async (req, res, next) => {
	const books = await Book.find({ status: "active" });
	res.setHeader("Content-Type", "application/json");
	res.json(books);
});

router.get("/all", async (req, res, next) => {
	const book = await Book.find();
	res.setHeader("Content-Type", "application/json");
	res.json(book);
});

module.exports = router;
