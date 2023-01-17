import Hotel  from "../models/hotels.js"



const create_hotel = async (req, res) => {
    
    const hotel = await new Hotel(req.body)
    
    try {
        const saveHotel = await hotel.save()
        res.status(200).json(saveHotel)
    } catch (e){
        res.status(500).json(e);
    }
}


const update_hotel = async (req, res) => {

    const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
    
    try {
        res.status(200).json(updateHotel)
    } catch (e) {
        res.status(404).json(e)
    }
}





export {
    create_hotel,
    update_hotel
}