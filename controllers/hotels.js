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
    try {
        const allHotels = await Hotel.find()
        res.status(200).json(allHotels.reverse())
    } catch (err) {
        res.status(500).json(err)
    }
}


// const hotel_search = async (req, res, next) => {
//     const location = req.query.location;
//     // let location;
//     try {
//         location = await Hotel.aggregate([
//                 {$match: {city: 'city'} },
//                 { $sample: { size: 1 } },
//             ]);
//             res.status(200).json(location)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

const hotel_search = async (req, res, next) => {
    const query = {}
    try {
        if (req.query.search) {
            query.city = { $regex: req.query.search, $options: 'i'}
        } 
        const cities = await Hotel.find(query)
        res.status(200).json(cities)
    } catch (err) {
        res.status(500).json(err)
    }
 }

// const hotel_search = async (req, res, next) => {
//     const location = req.query.location.split(',')
//     // let location;
//     try {
//         location = await Promise.all(location.map(city => {
//             return Hotel.countDocuments({city:city})
//         }))
//         res.status(200).json(location)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

export {
    create_hotel,
    update_hotel,
    delete_hotel,
    get_single_hotel,
    get_all_hotels,
    hotel_search
}