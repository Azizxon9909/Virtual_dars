const Joi = require('joi');
const mongoose = require('mongoose');
const { categorySchema } = require('./category');

const Course = mongoose.model('Courses', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  category: {
    type: categorySchema,
    required: true
  },
  trainer: {
    type: String,
    required: true
  },
  tags: {
    type: [String]
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    required: true
  },
  fee: {
    type: Number,
    required: true
  }
}));

const schema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  categoryId: Joi.string().required(),
  trainer: Joi.string().required(),
  status: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  fee: Joi.number().min(0)
});
exports.Course = Course;
exports.validate = schema;