const mongoose = require("mongoose")

const Event = new mongoose.Schema({
    name: String,
    city: String,
    display_address: String,
    description: String,
    image_url: String,
    attending_count: Number
}, {
    timestamps: true
})

module.exports = mongoose.model('Event', Event);