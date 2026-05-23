const mongoose= require("mongoose");


const HeroSectionSchema = new mongoose.Schema(
    {
        headline:{type:String},
        title:{type:String},
        desc:{type:String},
        btn1:{type:String},
        btn2:{type:String}
    }
)

module.exports=mongoose.model("HeroSection",HeroSectionSchema)