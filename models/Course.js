const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const courseSchema = new Schema({
    _id: Number,
    name: String,
    description: String,
    author: String,
    URL: String,
    status: String
});

courseSchema.plugin(AutoIncrement, {id: 'courses_id_counter', inc_field: "_id"})

mongoose.model('courses', courseSchema); // load into mongoose