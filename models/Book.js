const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const bookSchema = new Schema({
    _id: Number,
    name: String,
    description: String,
    author: String,
    image: String,
    URL: String,
    status: String
});

bookSchema.plugin(AutoIncrement, {id: 'books_id_counter', inc_field: "_id"})

mongoose.model('books', bookSchema); // load into mongoose