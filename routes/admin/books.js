const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authenticateToken = require("../../middleware/authenticateToken");
require("../../models/Book");
const Book = mongoose.model("books");

const STATUS_ACTIVE = "active";

router.post("/", authenticateToken, async (req, res) => {
	const { name, description, author, image, URL } = req.body;

	if ((name, description, author, image, URL)) {
		const book = new Book({
			name,
			description,
			author,
			image,
			URL,
			STATUS_ACTIVE,
		});

		Book.findOne({ name: name }, (err, doc) => {
			if (doc) {
				return res.status(400).send("Book already exists");
			} else {
				book.save((err, book) => {
					if (err) return res.status(500).send("An unexpected error occured.");

					return res.status(201).json(book);
				});
			}
		});
	} else {
		return res.status(400).send("All input is required");
	}
});

router.patch("/:id", authenticateToken, async (req, res) => {
	const status = req.query.status;
	const bookId = req.params.id;

	if (status) {
		try {
			let doc = await Book.updateOne(
				{ _id: bookId },
				{ status },
				{
					new: true,
				}
			);
			if (doc) {
				return res.status(200).send("Book was updated.");
			}
			return res.status(400).send("Book not found.");
		} catch (error) {
			return res.status(500).send("An unexpected error occured");
		}
	}

	const { name, description, author, image, URL } = req.body;

	try {
		let doc = await Book.findOneAndUpdate(
			{ id: bookId },
			{ name, description, author, image, URL },
			{
				new: true,
			}
		);
		if (doc) {
			return res.status(200).send("Book was updated.");
		}
		return res.status(400).send("Book not found.");
	} catch (error) {
		return res.status(500).send("An unexpected error occured");
	}
});

module.exports = router;
