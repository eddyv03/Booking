const express = require("express");
const router = express.Router();

const Cottage = require("../models/cottage");
const { model } = require("mongoose");

router.get("/getallcottages", async (req, res) => {
  try {
    const cottages = await Cottage.find({});
    res.send(cottages);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getcottagebyid", async (req, res) => {
  const cottageid = req.body.roomid;

  try {
    const cottage = await Cottage.findOne({ _id: cottageid });
    res.send(cottage);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addcottage", async (req, res) => {
  try {
    const newcottage = new Cottage(req.body);
    await newcottage.save();
    res.send("New Room Added Succesfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
