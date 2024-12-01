// models/Xray.js
const mongoose = require("mongoose");

const xraySchema = new mongoose.Schema(
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
        image: String, // Field to store the image path
    },
    { timestamps: true }
);

const XrayModel = mongoose.model("Xray", xraySchema);
module.exports = XrayModel;
