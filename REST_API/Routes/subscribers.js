const express = require("express");
const router = express.Router();
const Subscriber = require("../Models/subscribers");

router.get("/", async (req, res) => {
    try{
        const subscribers = await Subscriber.find();
        res.status(200).json(subscribers);
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }
});

router.post("/", async (req, res) => {
    const subscriber = new Subscriber({
        username: req.body.username,
        userChannel: req.body.userChannel
    });

    try{
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch(err) {
        res.status(400).json({success: false, message: err.message});
    }
});

router.get("/:id", getSubscriber, (req, res) => {
    res.json(res.subscriber);
});

router.delete("/:id", getSubscriber, async (req, res) => {
    try{
        await res.subscriber.remove();
        res.json({success: true, message: "Deleted subscriber"});
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }
});

routes.patch("/:id", getSubscriber, async (req, res) => {
    if (req.body.username != null) {
        res.subscriber.username = req.body.username;
    }
    if (req.body.userChannel != null) {
        res.subscriber.userChannel = req.body.userChannel;
    }
    try{
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    } catch(err) {
        res.status(400).json({success: false, message: err.message});
    }
});

async function getSubscriber(req, res, next) {
    try {
        let subscriber = await Subscriber.findById(req.params.id);
        if (subscriber == null) {
            return res.status(404).json({success: false, message: "Subscriber not found"});
        }
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
    res.subscriber = subscriber;
}

module.exports = router;