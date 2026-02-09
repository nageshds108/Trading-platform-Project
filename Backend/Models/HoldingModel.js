const {HoldingSchema}= require("../Schemas/HoldingSchema.js")
const mongoose= require("mongoose")

const Holdings= mongoose.model("Holdings",HoldingSchema)
module.exports={Holdings}