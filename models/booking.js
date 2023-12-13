const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    cottage: {
      type: String,
      required: true,
    },
    cottageid: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
    selectedDate: {
      type: String,
      required: true,
    },
    rentperday: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "booked",
    },
  },
  {
    timestamps: true,
  }
);

const bookingmodel = mongoose.model("bookings", bookingSchema);

module.exports = bookingmodel;
