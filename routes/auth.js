import express from "express";
import {
    sign_up,
    login,
    resetPasswordRequest,
    newPassword
} from "../controllers/auth.js";
const router = express.Router();


router.post('/signup', sign_up);
router.post('/login', login);
router.post('/resetPassword', resetPasswordRequest);
router.post('/newPassword', newPassword);



export default router;