import User  from "../models/users.js"
import { verify } from "../utils/verification.js";
import CryptoJS from "crypto-js"


const update_user =  async (req, res) => {

    if(req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.JWT_SECRET).toString();
        }
        try {
            const updateduser = await User.findByIdAndUpdate(req.params.id,
                { $set: req.body }, { new: true });
            res.status(200).json(updateduser)
        }catch (e) {
            res.status(404).json(e)
        }
    } else {
        res.status(403).json("You are not authorized!")
    }
}


const delete_user = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Deleted successfully!");
    }catch (e) {
        res.status(500).json(e)
    }
}

const get_single_user = async (req, res) => {
    try {
        const singleuser = await User.findById(req.params.id)
        res.status(200).json(singleuser)
    } catch (e) {
        res.status(500).json(e)
    }
}

const get_all_users = async (req, res) => {
    try {
        const allusers = await User.find()
        res.status(200).json(allusers.reverse())
    } catch (e) {
        res.status(500).json(e)
    }
}


export {
    update_user,
    delete_user,
    get_all_users,
    get_single_user
}