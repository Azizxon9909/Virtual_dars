const express = require("express");
const router = express.Router();
const { validation, User } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find();
//     // res.send(_.pick(users, ['_id', 'name', 'email']))
//     res.send(users);
//   } catch (err) {
//     res.send({ status: "fail", msg: err.message });
//   }
// });
router.post("/", async (req, res) => {
  try {
    const { error } = validation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.send("Mavjud bolgan foydalanuvchi");
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin
    });
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(_.pick(user, ["_id", "name", "email", 'isAdmin']));
    // const { name, email } = user;
    // res.send({ name, email });
  } catch (err) {
    res.send({ status: "fail", msg: err.message });
  }
});
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
  } catch (err) {
    res.send({ status: "Fail", msg: err.message });
  }
});

module.exports = router;
