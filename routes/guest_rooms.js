import express from "express";

const router = express.Router();



router.get("/", async(req, res) => {
    res.send("hello rooms!!")
})


router.get("/", async(req, res) => {
    res.send("hello world!!")
})


router.put("/", async(req, res) => {
    res.send("hello world!!")
})


router.delete("/", async(req, res) => {
    res.send("hello world!!")
})

export default router;