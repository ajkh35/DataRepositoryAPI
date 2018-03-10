var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Song = require('./song');

var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    user_name: {type: String,required: [true, 'User Name is required'],unique: true},
    email: {type: String,required: [true, 'Email is required'],unique: true},
    password: {type: String, minlength: 6},
    avatar: {data: Buffer, contentType: String},
    songs: [{type: Schema.Types.ObjectId, ref: 'Song'}],
    movies: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
    games: [{type: Schema.Types.ObjectId, ref: 'Game'}]
}, {collection: 'user'}, {timestamps: true});

var User = mongoose.model('User', UserSchema);
module.exports = User;