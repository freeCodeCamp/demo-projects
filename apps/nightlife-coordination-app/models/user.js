var mongoose = require('mongoose');

var User = new mongoose.Schema({
	github: {
		id: String,
		displayName: String,
		username: String,
        imageUrl: String
	},
    events: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}]
});

module.exports = mongoose.model('User', User);