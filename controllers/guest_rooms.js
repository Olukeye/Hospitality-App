import Guest_room from "../models/guest_rooms.js"
import Hotel from "../models/hotels.js"
import dotenv from "dotenv"
import Stripe from 'stripe';


dotenv.config();


const stripe = new Stripe(process.env.SECRET_KEY);


const create_guest_room = async (req, res, next) => {
    const newRoom = new Guest_room(req.body)

    try {
        const savedRoom = await newRoom.save()

        await Hotel.findByIdAndUpdate(req.params.id, { $push: { rooms: savedRoom._id } }, { new: true })

       return  res.status(201).json({ message: "Room created successfully", data: savedRoom});

        
    } catch (err) {
        return next(err) 
    }
} 

const update_guest_room = async (req, res, next) => {
    try {
        const updatedGuest_room = await Guest_room.findByIdAndUpdate(req.params.id,
            { $set: req.body }, { new: true }
        )
        return res.status(200).json({ message: "update successful", data: updatedGuest_room});
    } catch (err) {
       return next(err)
    }
}

const delete_guest_room = async (req, res, next) => {

    const hotelId = req.params.hotelid
    
    try {
        await Guest_room.findByIdAndDelete(req.params.id);

        await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } }, { new: true })

        return res.status(200).json({ message: "Room deleted successfully" });
        
        } catch (err) {
            return next(err)
        }
    } 

const get_single_guest_room = async (req, res, next) => {
    try {
        const singleGuestRoom = await Guest_room.findById(req.params.id)

        return res.status(200).json({ message: "Success!!", data: singleGuestRoom});
    } catch (err) {
        return next(err)
    }
}

const get_all_GuestRooms = async (req, res) => {
    try {
        const allGuestRooms = await Guest_room.find()

        res.status(200).json({ message: "Success!!", data: allGuestRooms.reverse()})
    } catch (err) {
        return next(err)
    }
}

const update_guest_room_date_available = async (req, res, next) => {
    try {
        const availableDate = await Guest_room.updateOne({"roomNumber._id": req.params.id}, { $push:{"roomNumber.$.bookedDate" : req.body.dates}})
        return res.status(200).json({ message: "Available room date updated successfully"});
    } catch (err) {
       return next(err)
    }
}

const billPayment = async (req, res) => {
    try {
        stripe.customers
          .create({
            name: req.body.name,
            email: req.body.email,
            source: req.body.stripeToken,
            
          })
          .then(customer =>
            stripe.charges.create({
              amount: req.body.price * 100,
              currency: "usd",
                customer: customer.id,
                description: 'The coolest rooms'
            })
          )
          .then(() => res.render("completed.html"))
          .catch(err => console.log(err));
    } catch (err) {
        res.send(err);
    }
}


export {
    create_guest_room,
    update_guest_room,
    get_single_guest_room,
    get_all_GuestRooms,
    delete_guest_room,
    update_guest_room_date_available,
    billPayment

}