const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AMOUNT_OF_SALT_ROUNDS = 10;

function generatePasswordHash(password) {
	const salt = bcrypt.genSaltSync(AMOUNT_OF_SALT_ROUNDS);
	const hash = bcrypt.hashSync(password, salt);

	return hash;
}

function comparePassword(givenPassword, savedHash) {
	return bcrypt.compare(givenPassword, savedHash);
}

function generateToken(id, username) {
	return jwt.sign({ user_id: id, username }, process.env.TOKEN_KEY, {
		expiresIn: "2h",
	});
}

module.exports = { generatePasswordHash, comparePassword, generateToken };
