function getItemsBasedOnStatus(status, mongooseModel) {
	if (status) {
		return mongooseModel.find({ status });
	}

	return mongooseModel.find();
}

function checkIfItemsWereFound(items) {
	return items && items.length > 0;
}

module.exports = { getItemsBasedOnStatus, checkIfItemsWereFound };
