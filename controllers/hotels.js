import Hotel  from "../models/hotels.js"



const create_hotel = async (req, res) => {
    const hotel =  new Hotel(req.body)
    try {
        const savedHotel = await hotel.save()
        res.status(200).json(savedHotel)
    }catch (err){
        res.status(500).json(err);
    }
}


const update_hotel = async (req, res) => {
    const updateHotel = await Hotel.findByIdAndUpdate(req.params.id,
        { $set: req.body }, { new: true });
    try {
        res.status(200).json(updateHotel)
    }catch (err) {
        res.status(404).json(err)
    }
}


const delete_hotel = async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted successfully!");
    }catch (err) {
        res.status(500).json(err)
    }
}

const get_single_hotel = async (req, res) => {
    try {
        const singleHotel = await Hotel.findById(req.params.id)
        res.status(200).json(singleHotel)
    } catch (err) {
        res.status(500).json(err)
    }
}

const get_all_hotels = async (req, res) => {
    const  {min, max, ...others} = req.query;
    // var limiting = parseInt(req.query.limit) || 1;
    try {
        const allHotels = await Hotel.find({...others, price:{$gt: min| 200,  $lt: max || 500 }}).limit(req.query.limit)
        res.status(200).json(allHotels.reverse())
    } catch (err) {
        res.status(500).json(err)
    }
}

const hotel_search_by_city = async (req, res, next) => {
    const query = {}
    try {
        if (req.query.search) {
            query.city = { $regex: req.query.search, $options: 'i'}
        } 
        const cities = await Hotel.find(query).count()
        res.status(200).json(cities)
    } catch (err) {
        res.status(500).json(err)
    }
 }


 const hotel_search_by_name= async (req, res, next) => {
    const query = {}
    try {
        if (req.query.search) {
            query.name = { $regex: req.query.search, $options: 'i'}
        } 
        const hotelName = await Hotel.find(query)
        res.status(200).json(hotelName)
    } catch (err) {
        res.status(500).json(err) 
    }
}
 
const hotel_search_by_type = async (req, res, next) => {
    
    try {
       const hotelType = await Hotel.countDocuments({ type: "hotel" })
       const apartmentType = await Hotel.countDocuments({ type: "apartment" })
       const resortType = await Hotel.countDocuments({ type: "resort" })
       const lodgeType = await Hotel.countDocuments({ type: "lodge" })
       const cabinType = await Hotel.countDocuments({ type: "cabin" })

        res.status(200).json([
            { type: "hotel", count: hotelType },
            { type: "apartment", count: apartmentType },
            { type: "resort", count: resortType },
            { type: "lodge", count: lodgeType },
            { type: "cabin", count:cabinType }
        ])
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
    hotel_search_by_city,
    hotel_search_by_name,
    hotel_search_by_type
}