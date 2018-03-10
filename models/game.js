var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    title: String,
    creator: String,
    year: Number,
    trailer_url: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {collection: 'games'}, {timestamps: true});

var Game = mongoose.model('Game', GameSchema);
module.exports = Game;