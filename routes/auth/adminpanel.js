const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");
require("../../models/Course");
const Course = mongoose.model("courses");

router.get("/welcome", auth, (req, res) => {
	res.status(200).send("Welcome 🙌 ");
});

router.post("/courses/new", async (req, res) => {
	const { name, description, author, URL } = req.body;
	const status = "active";
	const course = new Course({ name, description, author, URL, status });
	course.save((err, course) => {
		if (err) console.log(err);
		res.setHeader("Content-Type", "application/json");
		res.json(course);
	});
});

module.exports = router;
