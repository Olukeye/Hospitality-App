import User from "../models/users.js"
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken"


const sign_up = async (req, res) => {
    try {
        const user = await new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.JWT_SECRET).toString()
        })
        const new_user = await user.save()
        res.status(201).json(new_user)
    } catch (e) {
        res.status(500).json(e)
    }
}

// Login user
const login = async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});

        !user && res.status(400).json("Wrong email or password!");

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.JWT_SECRET);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        // if login password doesn't match the original password .....
        originalPassword !== req.body.password && res.status(400).json('Wrong email or password!')

        // accessToken
        const token = jwt.sign({id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {expiresIn: "1d"} );
        const { password, isAdmin, ...info } = user._doc;  //Hide user password
        
        res.status(200).json({...info, token})

    } catch(e) {
        res.status(500).json(e)
    }
}

export {
    sign_up,
    login
}