const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("../../models/User");
const User = mongoose.model("users");

router.post("/", async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!(username && password)) {
			return res.status(400).send("All input is required");
		}

		const user = await User.findOne({ username });

		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign(
				{ user_id: user._id, username },
				process.env.TOKEN_KEY,
				{
					expiresIn: "2h",
				}
			);

			user.token = token;

			return res.status(200).json(token);
		}
		return res.status(400).send("Invalid Credentials");
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
