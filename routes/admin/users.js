const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authenticateToken = require("../../middleware/authenticateToken");
const bcrypt = require("bcrypt");

require("../../models/User");
const User = mongoose.model("users");

router.post("/:id", authenticateToken, async (req, res) => {
	const { username, oldPassword, newPassword } = req.body;
	const userId = req.params.id;

	if (username !== req.user.username) {
		return res.status(401).send("Invalid credentials");
	}

	try {
		const user = await User.findOne({ _id: userId });
		if (user && (await bcrypt.compare(oldPassword, user.password))) {
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(newPassword, salt);

			user.password = hash;
			user
				.save()
				.then((savedUser) => {
					return res.status(200).send("Password was changed");
				})
				.catch((error) => {
					return res.status(500).send("An unexpected error occured");
				});
		}
	} catch (error) {
		return res.status(404).send("User not found");
	}
});

module.exports = router;
