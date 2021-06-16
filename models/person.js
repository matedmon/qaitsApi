const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    identity: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "Identity is already in use!"],
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
      lowercase: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 30,
      lowercase: true,
    },
    age: {
      type: String,
      required: true,
      trim: true,
    },
    sex: {
      type: String,
      required: true,
      enum: {
        values: ["M", "F"],
        message: "Sex value should be 'M' or 'F'!",
      },
    },
    mobile: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    active: {
      type: String,
      required: true,
      enum: {
        values: ["TRUE", "FALSE"],
        message: "The value should be 'TRUE' or 'FALSE'!",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Person", personSchema);
