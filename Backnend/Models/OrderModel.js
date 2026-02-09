const mongoose = require("mongoose");
const OrderSchema = require("../Schemas/OrderSchema");

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
