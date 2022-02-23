const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authenticateToken = require("../../middleware/authenticateToken");
const bcrypt = require("bcrypt");

require("../../models/User");
const User = mongoose.model("users");

const AMOUNT_OF_SALT_ROUNDS = 10;

function checkCurrentUser(givenUsername, existingUsername) {
	return givenUsername === existingUsername;
}

async function comparePassword(user, givenOldPassword) {
	existingPassword = user.password;
	return user && (await bcrypt.compare(givenOldPassword, existingPassword));
}

function generatePasswordHash(password) {
	const salt = bcrypt.genSaltSync(AMOUNT_OF_SALT_ROUNDS);
	const hash = bcrypt.hashSync(password, salt);

	return hash;
}

router.post("/:id", authenticateToken, async (req, res) => {
	const { username, oldPassword, newPassword } = req.body;
	const userId = req.params.id;

	try {
		const user = await User.findOne({ _id: userId });

		if (!checkCurrentUser(username, user.username)) {
			return res.status(401).send("Invalid credentials");
		}

		if (comparePassword(user, oldPassword)) {
			user.password = generatePasswordHash(newPassword);

			user
				.save()
				.then(() => {
					return res.status(200).send("Password was changed");
				})
				.catch(() => {
					return res.status(500).send("An unexpected error occured");
				});
		}
	} catch (error) {
		console.log(error);
		return res.status(404).send("User not found");
	}
});

module.exports = router;
