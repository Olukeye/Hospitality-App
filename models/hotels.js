import mongoose from "mongoose"


const HotelSchema = new mongoose.Schema({
    name: {type:String, required: true, min: 3, max: 32, unique: true},
    city: { type: String, required: true},
    title: { type: String, require: true },
    type: {type:String, require:true},
    address: { type: String, required: true },
    distance:{type:String, required:true},
    image: {type: [String] },
    rooms: {type: [String]}, 
    cheapestRate: {type: Number, required:true},
    discription: {type:String, required:true},
    rating: {type:Number, min:0, max:5},
    featured: {type:Boolean, default: false}
}, {timestamps: true} )

export default mongoose.model("Hotel", HotelSchema);