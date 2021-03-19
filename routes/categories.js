const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  const categories = await Category.find().sort("name");
  res.send(categories);
});

router.post("/", auth, async (req, res) => {
  try {
    let category = new Category({
      name: req.body.name,
    });
    category = await category.save();

    res.status(201).send(category);
  } catch (err) {
    res.send({ status: "Fail", msg: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    res.send(category);
  } catch (err) {
    res.send({ status: "Fail", msg: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      {
        new: true,
      }
    );

    res.send(category);
  } catch (err) {
    res.send({ status: "Fail", msg: err.message });
  }
});

router.delete("/:id", [auth,admin], async (req, res) => {
  try {
    let category = await Category.findByIdAndRemove(req.params.id);

    res.send(category);
  } catch (err) {
    res.send({ status: "Fail", msg: err.message });
  }
});

module.exports = router;
