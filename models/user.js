const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2
  },
  email: {
    type: String,
    minlength: 2,
    unique: true,
  },
  password: {
    type: String,
    minlength: 2
  },
  isAdmin: {
    type: Boolean
  }
});
const User = mongoose.model("user", userSchema);

const validation = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().min(2).email().required(),
  password: Joi.string().min(2).required(),
  isAdmin: Joi.boolean()
});

exports.User = User;
exports.validation = validation;
