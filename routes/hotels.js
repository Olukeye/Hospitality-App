import express from "express";
const router = express.Router();


import { create_hotel } from "../controllers/hotels.js";



router.get('/', create_hotel);





export default router;
