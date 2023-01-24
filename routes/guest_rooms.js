import express from "express";
const router = express.Router();


import { create_guest_room } from "../controllers/guest_rooms.js";

router.post('/', create_guest_room );

// router.put('/:id', update_hotel);
// router.delete('/:id', delete_hotel);
// router.get('/:id', get_single_hotel);
// router.get('/', get_all_hotels)


export default router;
