const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authenticateToken = require("../../middleware/authenticateToken");
require("../../models/Course");
require("../../models/Project");
require("../../models/Book");
const Course = mongoose.model("courses");
const Project = mongoose.model("projects");
const Book = mongoose.model("books");

router.patch("/courses/:id", authenticateToken, async (req, res) => {
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

router.post("/courses", authenticateToken, (req, res) => {
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

router.patch("/projects/:id", authenticateToken, async (req, res) => {
	const status = req.query.status;
	const projectId = req.params.id;

	if (status) {
		try {
			let doc = await Project.updateOne(
				{ _id: projectId },
				{ status },
				{
					new: true,
				}
			);
			if (doc) {
				return res.status(200).send("Project was updated.");
			}
			return res.status(400).send("Project not found.");
		} catch (error) {
			return res.status(500).send("An unexpected error occured");
		}
	}

	const { name, description, image, URL, githubURL } = req.body;

	try {
		let doc = await Project.findOneAndUpdate(
			{ id: projectId },
			{ name, description, image, URL, githubURL },
			{
				new: true,
			}
		);
		if (doc) {
			return res.status(200).send("Project was updated.");
		}
		return res.status(400).send("Project not found.");
	} catch (error) {
		return res.status(500).send("An unexpected error occured");
	}
});

router.post("/projects", authenticateToken, (req, res) => {
	const { name, description, image, URL, githubURL } = req.body;
	const status = "active";

	if ((name, description, image, URL, githubURL)) {
		const project = new Project({
			name,
			description,
			image,
			URL,
			githubURL,
			status,
		});

		Project.findOne({ name: name }, (err, doc) => {
			if (doc) {
				return res.status(400).send("Project already exists");
			} else {
				project.save((err, project) => {
					if (err) return res.status(500).send("An unexpected error occured.");

					return res.status(201).json(project);
				});
			}
		});
	} else {
		return res.status(400).send("All input is required");
	}
});

router.post("/books", authenticateToken, async (req, res, next) => {
	const { name, description, author, image, URL } = req.body;
	const status = "active";

	if ((name, description, author, image, URL)) {
		const book = new Book({ name, description, author, image, URL, status });

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

router.patch("/books/:id", authenticateToken, async (req, res) => {
	const status = req.query.status;
	const bookId = req.params.id;

	if (status) {
		try {
			let doc = await Project.updateOne(
				{ id: bookId },
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
