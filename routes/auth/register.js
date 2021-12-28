const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../../models/User");
const User = mongoose.model("users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!(username && password)) {
			return res.status(400).send("All input is required");
		}

		const oldUser = await User.findOne({ username });

		if (oldUser) {
			return res.status(409).send("This user already exists. Please login");
		}

		const user = new User({
			username: username,
		});

		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);

		const token = jwt.sign(
			{ user_id: user._id, username },
			process.env.TOKEN_KEY,
			{
				expiresIn: "2h",
			}
		);

		user.password = hash;

		user.save((err, savedUser) => {
			if (!err) {
				const { username, id } = user;
				return res.status(200).json({ token: token, username, id });
			}
		});
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
