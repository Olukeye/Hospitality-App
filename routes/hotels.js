import express from "express";
import { create_hotel, update_hotel, delete_hotel, get_single_hotel, get_all_hotels, get_hotel_location } from "../controllers/hotels.js";
import { verify } from "../utils/verification.js";
const router = express.Router();


router.post('/', verify, create_hotel);
router.get('/country',  get_hotel_location);
// router.put('/:id', verify, update_hotel);
// router.delete('/:id', verify, delete_hotel);
// router.get('/:id', verify , get_single_hotel);
// router.get('/', get_all_hotels)


export default router;
