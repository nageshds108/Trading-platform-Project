const mongoose= require("mongoose")


const HoldingSchema=mongoose.Schema({
     name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,

})

module.exports={HoldingSchema}