const { Customer, validate } = require("../models/customer");
// const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().sort("name");
    res.send(customers);
  } catch (err) {
    res.send({ status: "Fail", msg: err.message });
  }
});

router.post("/", async (req, res) => {

  const { error } = validate.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let customer = new Customer({
    name: req.body.name,
    isVip: req.body.isVip,
    phone: req.body.phone,
    bonusPoints: 0,
  });
  customer = await customer.save();

  res.status(201).send(customer);
});

router.get("/:id", async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id);
    if (!customer)
      return res.status(404).send("Berilgan IDga teng bo'lgan mijoz topilmadi");

    res.send(customer);
  } catch (err) {
    res.send({ status: "Fail", msg: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      {
        new: true,
      }
    );

    if (!customer)
      return res.status(404).send("Berilgan IDga teng bo'lgan mijoz topilmadi");

    res.send(customer);
  } catch (err) {
    res.send({ status: "Fail", msg: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer)
      return res.status(404).send("Berilgan IDga teng bo'lgan mijoz topilmadi");

    res.send(customer);
  } catch (err) {
    res.send({ status: "Fail", msg: err.message });
  }
});

module.exports = router;
