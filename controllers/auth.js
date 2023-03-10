import User from "../models/users.js"
import Token from "../models/token.js"
import CryptoJS from "crypto-js"
import bcrypt from "bcrypt"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { sendEmail } from "../utils/email_handler/sendEmail.js"
import { createJWT } from "../utils/jwt.js"

dotenv.config();

const bcryptSalt = "12";

const sign_up = async (req, res, next) => {
    const { email } = req.body;

    const emailExisted = await User.findOne({email})
    if (emailExisted) {
        return res.status(401).json({"message":"email alreday exist"})
    }

    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.JWT_SECRET).toString(),
        });

        const token = createJWT(user);

        const new_user = await user.save();

        console.log(new_user)

        res.status(201).json({user: new_user, token})
    } catch (err) {
        next(err)
    }
}

// Login user
const login = async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});

        !user && res.status(400).json("Wrong email or password!");

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.JWT_SECRET);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        // if login password doesn't match the original password .....
        originalPassword !== req.body.password && res.status(400).json('Wrong email or password!')

        // accessToken
        const token = jwt.sign({id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
        const { password, isAdmin, ...info } = user._doc;  //Hide user password
        
        res.status(200).json({...info, token})

    } catch(err) {
        next(err)
    }
}


const resetPasswordRequest = async (req, res, next) => {

    try {
        const user = await User.findOne({email: req.body.email})

        if (!user) {
            return res.status(401).json({"message":"User email does not exist"})
        }
    
        const token = await Token.findOne({ userId: user._id })
        
        if (token) {
            await token.deleteOne()
        }

        let resetToken = crypto.randomBytes(32).toString("hex");
        const hash = await bcrypt.hash(resetToken,  Number(bcryptSalt));

        await new Token({
            userId: user._id,
            token: hash,
            createdAt: Date.now(),
        }).save()

        const link = `${process.env.CLIENT_URL}/resetPassword/userId=${user._id}?token=${resetToken}`;
        await sendEmail(user.email,"Password Reset",{  name: user.username, link: link,},"./template/requestResetPassword.handlebars");
        res.status(200).json(link);

    } catch (err) {
        next(err)
    }
}


const newPassword = async (req, res, next) => {
    try {
        const {password, token, userId} = req.body;
        
        const passwordResetToken  = await Token.findOne({
            userId
        });

        if (!passwordResetToken) return res.status(400).send("Invalid link or expired");

        const isValid = bcrypt.compare(token, passwordResetToken.token);

        if (!isValid) {
          throw new Error("Invalid or expired password reset token");
        }
      
        const hash = await bcrypt.hash(password,  Number(bcryptSalt));
      
        await User.findByIdAndUpdate(
            req.params.id,
          { $set: { password: hash }},
          { new: true }
        );

        const user = await User.findById({_id: userId})
        if (!user) {
            return res.status(400).json("invalid link or expired")
        };

        console.log(user)

        sendEmail(user.email, "Password Reset Successfully",{ name: user.name },"./template/resetPassword.handlebars");

        await passwordResetToken.delete();
            
        return res.status(200).json({ message: "Password reset was successful" });
            
    } catch (error) {
        next(error);
        console.log(error)
    }

}


export {
    sign_up,
    login,
    resetPasswordRequest,
    newPassword
}