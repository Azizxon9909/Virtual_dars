const { Enrollment, validate } = require("../models/enrollment");
const { Course } = require("../models/course");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort("-dateStart");
    res.send(enrollments);
  } catch (err) {
    res.send({ status: fail, msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer)
      return res.status(404).send("Berilgan IDga teng bo'lgan mijoz topilmadi");

    const course = await Course.findById(req.body.courseId);
    if (!course)
      return res.status(404).send("Berilgan IDga teng bo'lgan kurs topilmadi.");
    console.log(req.body)
    let enrollment = new Enrollment({
      customer: {
        _id: customer._id,
        name: customer.name,
      },
      course: {
        _id: course._id,
        title: course.title,
      },
      courseFee: course.fee,
    });
    if (customer.isVip) enrollment.courseFee = course.fee - 0.2 * course.fee; //Vip mijozlarga 20% chegirma

    enrollment = await enrollment.save();

    res.send(enrollment);
  } catch (err) {
    res.send({ status: 'fail', msg: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment)
      return res
        .status(404)
        .send("Berilgan IDga teng bo'lgan qabul topilmadi.");

    res.send(enrollment);
  } catch (err) {
    res.status(404).send({ status: 'fail', msg: err.message });
  }
});

module.exports = router;