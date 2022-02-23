const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authenticateToken = require("../../middleware/authenticateToken");
const auth = require("../auth/globalFunctions");

require("../../models/User");
const User = mongoose.model("users");

function checkCurrentUser(givenUsername, existingUsername) {
	return givenUsername === existingUsername;
}

router.post("/:id", authenticateToken, async (req, res) => {
	const { username, oldPassword, newPassword } = req.body;
	const userId = req.params.id;

	try {
		const user = await User.findOne({ _id: userId });

		if (!checkCurrentUser(username, user.username)) {
			return res.status(401).send("Invalid credentials");
		}

		if (user && (await auth.comparePassword(oldPassword, user.password))) {
			user.password = auth.generatePasswordHash(newPassword);

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
		return res.status(404).send("User not found");
	}
});

module.exports = router;
