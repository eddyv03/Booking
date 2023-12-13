const mongoose = require("mongoose");

const cottageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    maxcount: {
      type: Number,
      require: true,
    },
    phonenumber: {
      type: Number,
      require: true,
    },
    rentperday: {
      type: String,
      required: true,
    },
    imageurls: [],
    currentbookings: [],
    type: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const cottageModel = mongoose.model("cottage", cottageSchema);

module.exports = cottageModel;
