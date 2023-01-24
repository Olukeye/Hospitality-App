import * as mongoose from 'mongoose';



const Guest_roomSchema = new mongoose.Schema({
    hotelId:{ type: mongoose.Types.ObjectId, ref: 'Hotel', required:true},
    title: {type:String, require:true},
    roomNumber: [
        {
            number: Number,
            bookedDate: {
                type: [Date]
            }
        }
    ],
    price: { type: Number, required: true },
    maxGuestNumber: { type: [String] },
    description: {type:String, required:true}
}, {timestamps: true} )

export default mongoose.model("Guest_room", Guest_roomSchema);