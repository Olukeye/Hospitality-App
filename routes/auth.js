import express from "express";

const router = express.Router();



router.post("/", async(req, res) => {
    res.send("hello world!!")
})


export default router;