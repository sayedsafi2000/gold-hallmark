// models/Xray.js
const mongoose = require("mongoose");

const hallmark = new mongoose.Schema(
    {
        customerID: String,
        company: String,
        item: String,
        quantity: Number,
        weight: Number,
        rate: Number,
        amount: Number,
        xray: String,
        customerFrom: Date,
    },
    { timestamps: true }
);

const HallMark = mongoose.model("Hallmark", hallmark);
module.exports = HallMark;