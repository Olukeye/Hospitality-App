import express from "express";
import { create_hotel, update_hotel, delete_hotel, get_single_hotel, get_all_hotels } from "../controllers/hotels.js";
const router = express.Router();


router.post('/', create_hotel);
router.put('/:id', update_hotel);
router.delete('/:id', delete_hotel);
router.get('/:id', get_single_hotel);
router.get('/', get_all_hotels)


export default router;
