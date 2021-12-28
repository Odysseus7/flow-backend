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

router.post("/", async (req, res, next) => {
	const { name, description, author, image, URL } = req.body;
	const status = "active";
	const book = new Book({ name, description, author, image, URL, status });
	book.save((err, book) => {
		if (err) console.log(err);
		res.setHeader("Content-Type", "application/json");
		res.json(book);
	});
});

module.exports = router;
