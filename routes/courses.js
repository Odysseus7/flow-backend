const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Course");
const Course = mongoose.model("courses");

router.get("/", async (req, res, next) => {
	const courses = await Course.find({ status: "active" });
	res.setHeader("Content-Type", "application/json");
	res.json(courses);
});

module.exports = router;
