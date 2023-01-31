import Hotel  from "../models/hotels.js"



const create_hotel = async (req, res) => {
    const hotel =  new Hotel(req.body)
    try {
        const savedHotel = await hotel.save()
        res.status(200).json(savedHotel)
    }catch (e){
        res.status(500).json(e);
    }
}


const update_hotel = async (req, res) => {
    const updateHotel = await Hotel.findByIdAndUpdate(req.params.id,
        { $set: req.body }, { new: true });
    try {
        res.status(200).json(updateHotel)
    }catch (e) {
        res.status(404).json(e)
    }
}


const delete_hotel = async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted successfully!");
    }catch (e) {
        res.status(500).json(e)
    }
}

const get_single_hotel = async (req, res) => {
    try {
        const singleHotel = await Hotel.findById(req.params.id)
        res.status(200).json(singleHotel)
    } catch (e) {
        res.status(500).json(e)
    }
}

const get_all_hotels = async (req, res) => {
    try {
        const allHotels = await Hotel.find()
        res.status(200).json(allHotels.reverse())
    } catch (e) {
        res.status(500).json(e)
    }
}


const get_hotel_location = async (req, res, next) => {
    const cities = req.query.cities
    let location;
    try {
        location = await Hotel.aggregate([
                { $match: { city: city } },
                { $sample: { size: 1 } },
            ]);
            res.status(200).json(location.count())
    } catch (err) {
        res.status(500).json(err)
    }
}


export {
    create_hotel,
    update_hotel,
    delete_hotel,
    get_single_hotel,
    get_all_hotels,
    get_hotel_location
}