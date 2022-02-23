const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function comparePassword(givenPassword, savedHash) {
	return bcrypt.compare(givenPassword, savedHash);
}

function generateToken(id, username) {
	return jwt.sign({ user_id: id, username }, process.env.TOKEN_KEY, {
		expiresIn: "2h",
	});
}

module.exports = { comparePassword, generateToken };
