import express from "express";
const router = express.Router();
import { verify } from "../utils/verification.js";
import { create_guest_room, update_guest_room, get_single_guest_room, get_all_GuestRooms, delete_guest_room, update_guest_room_date_available} from "../controllers/guest_rooms.js";




router.post('/:id', verify, create_guest_room);

router.put('/:id', verify, update_guest_room);

router.put('/availableRoom/:id', update_guest_room_date_available);

router.delete('/:id/:hotelid',verify, delete_guest_room);

router.get('/:id', verify, get_single_guest_room);

router.get('/',  get_all_GuestRooms)


export default router;
