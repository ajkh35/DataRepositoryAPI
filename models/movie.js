var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    title: String,
    genre: String,
    year: Number,
    trailer_url: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {collection: 'movies'}, {timestamps: true});

var Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;