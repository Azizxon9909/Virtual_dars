const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
  try {
    const { error } = validation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.send("Email yoki parol xato");
    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword) return res.send("Email yoki parol xato");
    const token = jwt.sign({_id: user._id, isAdmin: user.isAdmin}, 'secretKey')
    res.header('x-auth-token', token).send(true);
  } catch (err) {
    res.send({ status: "fail", msg: err.message });
  }
});
const validation = Joi.object({
    email: Joi.string().min(2).email().required(),
    password: Joi.string().min(2).required()
  });

module.exports = router;
