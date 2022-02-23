const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const common = require("./commonFunctions");
require("../models/Course");
const Course = mongoose.model("courses");

router.get("/", async (req, res) => {
	const status = req.query.status;
	let courses = await common.getItemsBasedOnStatus(status, Course);

	if (common.checkIfItemsWereFound(courses)) {
		res.setHeader("Content-Type", "application/json");
		return res.status(200).json(courses);
	}

	return res.status(404).send("No courses were found");
});

module.exports = router;
