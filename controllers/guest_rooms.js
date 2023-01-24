import Guest_room from "../models/guest_rooms.js"



const create_guest_room = async (req, res) => {
    const newRoom = new Guest_room(req.body)
    try {     
        const savedRoom = await newRoom.save()
        const rooms = await Guest_room.findById(savedRoom._id);
        await rooms.updateOne({$push: {hotel: req.body.hotelId}}, {new: true})
        res.status(201).json("done")
    } catch (err) {
        res.status(500).json(err);
    }
}








export {
    create_guest_room
}