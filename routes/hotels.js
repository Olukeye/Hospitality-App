import express from "express";
import { create_hotel, update_hotel } from "../controllers/hotels.js";
const router = express.Router();


router.post('/', create_hotel);
router.put('/:id', update_hotel);


export default router;
