const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});

const Category = mongoose.model('Category', categorySchema);

exports.Category = Category;

exports.categorySchema = categorySchema;