import Guest_room from "../models/guest_rooms.js"



const create_guest_room = async (req, res) => {
    const newRoom = new Guest_room(req.body)
    try {     
        const savedRoom = await newRoom.save()

        const rooms = await Guest_room.findById(savedRoom._id);

        await rooms.updateOne({$push: {hotel: req.body.hotelId}}, {new: true})
        res.status(201).json({
            message: "Room created successfully",
            data: rooms
        });
    } catch (err) {
        res.status(500).json(err);
    }
}


const update_guest_room = async (req, res, next) => {
    try {
        const updatedGuest_room = await Guest_room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        return res.status(201).json({
            message: "update successful",
            data: updatedGuest_room,
        });
    } catch (err) {
       return next(err)
    }
}

const delete_guest_room = async (req, res, next) => {
    try {     
        const rooms = await Guest_room.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Room deleted successfully"
        });
    } catch (err) {
        return next(err)
     }
}

const get_single_guest_room = async (req, res, next) => {
    try {
        const singleGuestRoom = await Guest_room.findById(req.params.id)
        return res.status(201).json({
            message: "Success!!",
            data: singleGuestRoom,
        });
    } catch (err) {
        return next(err)
    }
}


const get_all_GuestRooms = async (req, res) => {
    try {
        const allGuestRooms = await Guest_room.find()
        res.status(200).json({
            message: "Success!!",
            data: allGuestRooms.reverse()
        })
    } catch (err) {
        return next(err)
    }
}


export {
    create_guest_room,
    update_guest_room,
    get_single_guest_room,
    get_all_GuestRooms,
    delete_guest_room
}