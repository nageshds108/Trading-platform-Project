const {PositionSchema}= require("../Schemas/PositionSchema.js")
const mongoose= require("mongoose")

const Postions= mongoose.model("Postions",PositionSchema)
module.exports={Postions}