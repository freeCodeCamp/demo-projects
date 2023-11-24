const Event = require("../models/event.js")

function APIController() {
    this.refreshLocationEvents = async function(location, number_of_events_to_get) {
            const params = new URLSearchParams({
                location: location,
                limit: number_of_events_to_get
            })

            const yelp_res = await fetch("https://api.yelp.com/v3/businesses/search?" + params, {
                headers: {
                    "Authorization": `Bearer ${process.env.YELP_API_KEY}`
                }
            })

            const yelp_events = await yelp_res.json()

            const new_events = yelp_events.businesses.map((event) => {
                const titles = event.categories.map((cat) => cat.title)
                const event_desc = titles.join(" - ")

                return ({
                    "name": event.name,
                    "city": location,
                    "display_address": event.location.display_address.join(" "),
                    "description": event_desc,
                    "image_url": event.image_url,
                    "attending_count": 0
                })
            })

            await Event.create(new_events)
            
            return new_events
    }
}

module.exports = APIController;