import express from "express";
import { create_hotel, update_hotel, delete_hotel, get_single_hotel, get_all_hotels, hotel_search_by_city , hotel_search_by_name, hotel_search_by_type} from "../controllers/hotels.js";
import { verify } from "../utils/verification.js";
const router = express.Router();

 
router.post('/', verify, create_hotel);
router.get('/countrySearch', hotel_search_by_city);
router.get('/hotelNameSearch', hotel_search_by_name);
router.get('/hotelTypeSearch',  hotel_search_by_type);
router.put('/:id', verify, update_hotel);
router.delete('/:id', verify, delete_hotel);
router.get('/:id', verify , get_single_hotel);
router.get('/', get_all_hotels)


export default router;
