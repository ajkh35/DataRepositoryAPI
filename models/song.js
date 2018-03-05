var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = new Schema({
    title: String,
    artist: String,
    album: String,
    year: Number,
    youtube_url: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {collection: 'songs'}, {timestamps: true});

var Song = mongoose.model('Song', SongSchema);
module.exports = Song;