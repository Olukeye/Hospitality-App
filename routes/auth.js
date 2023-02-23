import express from "express";
import { sign_up, login, resetPasswordRequest} from "../controllers/auth.js";
const router = express.Router();


router.post('/signup', sign_up);
router.post('/login', login);
router.post('/resetPassword', resetPasswordRequest);


export default router;