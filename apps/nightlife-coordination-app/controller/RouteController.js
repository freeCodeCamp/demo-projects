
const Event = require("../models/event.js")
const User = require("../models/user.js")
const APIController = require("./APIController.js")

const api = new APIController()

function RouteController() {
    this.getLocationEvents = async function(req, res) {
        const location = req.query.location

        if(!location) {
            res.status(400).json({"message": "api call requires location param"})
        } else {
            let location_events = await Event.find({city: location})
            
            if(location_events.length < 10) {
                const number_of_missing_events = 10 - location_events.length

                console.log(`Getting ${number_of_missing_events} new events for the city of ${location}`)
                const clean_events =  await api.refreshLocationEvents(location, number_of_missing_events)

                location_events = location_events.concat(clean_events)
            }

            console.log(`sending events ${location_events.length}`)
    
            res.send(location_events)
        }

    }

    this.addEventToUser = async function(req, res) {
        const { eventId } = req.body
        const event = await Event.findById(eventId)

        await User.findOneAndUpdate(
            { _id: req.user._id}, 
            { $push: { events: event } }
        )

        event.attending_count += 1
        await event.save()

        res.status(200).json({message: "event added to user"})
    }

    this.removeEventFromUser = async function(req, res) {
        const { eventId } = req.body
        const event = await Event.findById(eventId)

        await User.findOneAndUpdate(
            { _id: req.user._id}, 
            { $pull: { events: eventId } }
        )

        event.attending_count -= 1
        await event.save()

        res.status(200).json({message: "event removed from user"})
    }
}

module.exports = RouteController;