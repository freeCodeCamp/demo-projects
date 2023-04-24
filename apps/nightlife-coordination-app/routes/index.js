const express = require('express');
const RouteController = require('../controller/RouteController')

const router = express.Router()
const controller = new RouteController()

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    } else {
        res.status(401).json({message: "User not authenticated"})
    }
}

router.get("/events", controller.getLocationEvents)

router.post("/add/event", isLoggedIn, controller.addEventToUser)

router.delete("/remove/event", isLoggedIn, controller.removeEventFromUser)


module.exports = router