const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require("../../models/User");
const User = mongoose.model("users");

const auth = require("./globalFunctions");

router.post("/", async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!(username && password)) {
			return res.status(400).send("All input is required");
		}

		const user = await User.findOne({ username });

		if (user && (await auth.comparePassword(password, user.password))) {
			const id = user._id;
			const token = auth.generateToken(id, username);

			return res.status(200).json({ token, username, id });
		}

		return res.status(400).send("Invalid Credentials");
	} catch (err) {
		return res.status(500).send("An unexpected error occured.");
	}
});

module.exports = router;
