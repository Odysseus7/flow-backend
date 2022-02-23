const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authenticateToken = require("../../middleware/authenticateToken");

require("../../models/Project");
const Project = mongoose.model("projects");

router.patch("/:id", authenticateToken, async (req, res) => {
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

router.post("/", authenticateToken, (req, res) => {
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

module.exports = router;
