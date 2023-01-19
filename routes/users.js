import express from "express";
import { update_user, delete_user, get_all_users, get_single_user } from "../controllers/users.js";
const router = express.Router();
import { verify } from "../utils/verification.js";



router.put('/update/:id', verify,  update_user)

router.delete('/delete/:id', delete_user)

router.get('/', get_all_users)

router.get('/:id', get_single_user)


export default router;