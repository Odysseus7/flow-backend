const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authenticateToken = require("../../middleware/authenticateToken");
require("../../models/Course");
const Course = mongoose.model("courses");

router.patch("/:id", authenticateToken, async (req, res) => {
	const status = req.query.status;
	const courseId = req.params.id;

	if (status) {
		try {
			let doc = await Course.updateOne(
				{ _id: courseId },
				{ status },
				{
					new: true,
				}
			);
			if (doc) {
				return res.status(200).send("Course was updated.");
			}
			return res.status(400).send("Course not found.");
		} catch (error) {
			return res.status(500).send("An unexpected error occured");
		}
	}

	const { title, description, author, URL } = req.body;

	try {
		let doc = await Course.findOneAndUpdate(
			{ id: courseId },
			{ title, description, author, URL },
			{
				new: true,
			}
		);
		if (doc) {
			return res.status(200).send("Course was updated.");
		}
		return res.status(400).send("Course not found.");
	} catch (error) {
		return res.status(500).send("An unexpected error occured");
	}
});

router.post("/", authenticateToken, (req, res) => {
	const { title, description, author, URL } = req.body;
	const status = "active";

	if ((title, description, author, URL)) {
		const course = new Course({ title, description, author, URL, status });

		Course.findOne({ title: title }, (err, doc) => {
			if (doc) {
				return res.status(400).send("Course already exists");
			} else {
				course.save((err, course) => {
					if (err) return res.status(500).send("An unexpected error occured.");

					return res.status(201).json(course);
				});
			}
		});
	} else {
		return res.status(400).send("All input is required");
	}
});

module.exports = router;
