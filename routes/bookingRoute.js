const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Cottage = require("../models/cottage");
const stripe = require("stripe")(
  "sk_test_51OKzKQJ2b4l19mVPaPQ2I4sQWe6gqFs7fKkzqm4l0ZPbJ5TDJaJco1fehZY5huRUxGE3YbQhsKWKzH8pW2qRymcV00jYeHIKni"
);
const { v4: uuidv4 } = require("uuid");

router.post("/bookcottage", async (req, res) => {
  const { cottage, userid, selectedDate, rentperday, token } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: rentperday * 100,
        customer: customer.id,
        currency: "php",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const newbooking = new Booking({
        cottage: cottage.name,
        cottageid: cottage._id,
        userid,
        selectedDate,
        rentperday,
        transactionId: "1234",
      });

      const booking = await newbooking.save();

      const cottagetemp = await Cottage.findOne({ _id: cottage._id });

      cottagetemp.currentbookings.push({
        bookingid: booking._id,
        selectedDate: selectedDate,
        userid: userid,
        status: booking.status,
      });

      await cottagetemp.save();
    }

    res.send("Payment Successful, Your Cottage is Booked");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/getbookingsbyuserid", async (req, res) => {
  const { userid } = req.body;

  try {
    const bookings = await Booking.find({ userid: userid });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, cottageid } = req.body;

  try {
    const bookingitem = await Booking.findOne({ _id: bookingid });
    bookingitem.status = "cancelled";
    await bookingitem.save();
    const cottage = await Cottage.findOne({ _id: cottageid });
    const bookings = cottage.currentbookings;
    const temp = bookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );
    cottage.currentbookings = temp;
    await cottage.save();
    res.send("Your booking cancelled successfully!");
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/getallcottages", async (req, res) => {
  try {
    const cottages = await Cottage.find();
    res.send(cottages);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
