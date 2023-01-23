import express from "express";
const router = express.Router();
import { verify } from "../utils/verification.js";
import { update_user, delete_user, get_all_users, get_single_user } from "../controllers/users.js";




router.put("/update/:id", verify, update_user);

router.delete('/delete/:id', verify, delete_user)

router.get('/:id',  get_single_user)

router.get('/', verify,  get_all_users)



export default router;