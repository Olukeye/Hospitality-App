import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {type:String, require: true, min: 3, max: 32, unique: true},
    email: {type:String, require: true, max: 42, unique: true},
    password: {type: String, require: true, min: 6, max: 20 },
    isAdmin: {type:Boolean, default: false},
}, {timestamps: true} )

export default mongoose.model("User", UserSchema);