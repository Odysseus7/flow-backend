const mongoose = require("mongoose");
var AutoIncrement = require("mongoose-sequence")(mongoose);

const { Schema } = mongoose;

const projectSchema = new Schema({
	_id: Number,
	name: String,
	description: String,
	image: String,
	URL: String,
	githubURL: String,
	status: String,
});

projectSchema.plugin(AutoIncrement, {
	id: "projects_id_counter",
	inc_field: "_id",
});

mongoose.model("projects", projectSchema); // load into mongoose
