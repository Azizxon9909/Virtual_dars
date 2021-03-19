const { Course, validate } = require("../models/course");
const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().sort("title");
    res.send(courses);
  } catch (err) {
    res.send({ status: "Fail", msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if (!category)
      return res
        .status(400)
        .send("Berilgan IDga teng bo'lgan toifa topilmadi.");

    let course = new Course({
      title: req.body.title,
      category: {
        _id: category._id,
        name: category.name,
      },
      trainer: req.body.trainer,
      tags: req.body.tags,
      status: req.body.status,
      fee: req.body.fee,
    });
    course = await course.save();

    res.send(course);
  } catch (err) {
    res.send({ status: "Fail", msg: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if (!category)
      return res
        .status(400)
        .send("Berilgan IDga teng bo'lgan toifa topilmadi.");

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        category: {
          _id: category._id,
          name: category.name,
        },
        trainer: req.body.trainer,
        tags: req.body.tags,
        status: req.body.status,
        fee: req.body.fee,
      },
      { new: true }
    );

    if (!course)
      return res.status(404).send("Berilgan IDga teng bo'lgan kurs topilmadi.");

    res.send(course);
  } catch (err) {
    res.send({ status: "Fail", msg: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndRemove(req.params.id);
    if (!course)
      return res.status(404).send("Berilgan IDga teng bo'lgan kurs topilmadi.");

    res.send(course);
  } catch (err) {
    res.send({ status: "Fail", msg: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course)
      return res.status(404).send("Berilgan IDga teng bo'lgan kurs topilmadi.");

    res.send(course);
  } catch (err) {
    res.send({ status: "Fail", msg: err.message });
  }
});

module.exports = router;
