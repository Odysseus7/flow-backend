const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Project");
const Project = mongoose.model("projects");

router.get("/", async (req, res, next) => {
	const projects = await Project.find({ status: "active" });
	res.setHeader("Content-Type", "application/json");
	res.json(projects);
});

router.get("/all", async (req, res, next) => {
	const projects = await Project.find();
	res.setHeader("Content-Type", "application/json");
	res.json(projects);
});

module.exports = router;
