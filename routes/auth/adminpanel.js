const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authenticateToken = require("../../middleware/authenticateToken");
require("../../models/Course");
const Course = mongoose.model("courses");

router.patch("/courses/:id", authenticateToken, async (req, res) => {
	const { title, description, author, URL, status } = req.body;
	const courseId = req.params.id;

	try {
		let doc = await Course.findOneAndUpdate(
			{ id: courseId },
			{ title, description, author, URL, status },
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

router.post("/courses/new", authenticateToken, (req, res) => {
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
