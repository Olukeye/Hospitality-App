import User from "../models/users.js"
import Token from "../models/token.js"
import CryptoJS from "crypto-js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { sendEmail } from "../utils/email_handler/sendEmail.js"
import { createJWT } from "../utils/jwt.js"
var hash = CryptoJS.SHA256("Message")

dotenv.config();



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
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
        });

        const token = createJWT(user);

        const new_user = await user.save();
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

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        // if login password doesn't match the original password .....
        originalPassword !== req.body.password && res.status(400).json('Wrong email or password!')

        // accessToken
        const token = jwt.sign({id: user.id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN});
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

        const resetToken = CryptoJS.lib.WordArray.random(32);

        await new Token({
            userId: user._id,
            token: resetToken,
            createdAt: Date.now(),
        }).save()

        const link = `${process.env.CLIENT_URL}/resetPassword/userId=${user._id}?token=${resetToken}`;
        await sendEmail(user.email,"Password Reset",{  name: user.username, link: link,},"./template/requestResetPassword.handlebars");
        res.status(200).json(link);

    } catch (err) {
        next(err)
    }
}


const newPassword = async (req, res, userId, token, password, next ) => {

    try {
        const user = await User.findOne(req.params.userId)
        if (!user) {
            return res.status(400).json("invalid link or expired")
        };

        const resetPassword = await Token.findOne({ iserId: user._id, token: req.params.token })
        if (!resetPassword) {
            return res.status(400).json("This password token is invalid or expired")
        }

        console.log(resetPassword.token, token);

        const isValid = await bcrypt.compare(token, resetPassword.token);
      
        if (!isValid) {
          throw new Error("Invalid or expired password reset token");
        }
      
        const hash = await bcrypt.hash(password, Number(bcryptSalt));
      
        await User.updateOne(
          { _id: userId },
          { $set: { password: hash } },
          { new: true }
        );
        await resetPassword.delete();

        sendEmail(user.email, "Password Reset Successfully",{ name: user.name },"./template/resetPassword.handlebars");
            
        return { message: "Password reset was successful" };
            
    } catch (error) {
        return next(error)
    }

}


export {
    sign_up,
    login,
    resetPasswordRequest,
    newPassword
}