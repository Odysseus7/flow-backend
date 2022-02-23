const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const common = require("./commonFunctions");

require("../models/Project");
const Project = mongoose.model("projects");

router.get("/", async (req, res) => {
	const status = req.query.status;
	let projects = await common.getItemsBasedOnStatus(status, Project);

	if (common.checkIfItemsWereFound(projects)) {
		res.setHeader("Content-Type", "application/json");
		return res.status(200).json(projects);
	}

	return res.status(404).send("No projects were found");
});

module.exports = router;
