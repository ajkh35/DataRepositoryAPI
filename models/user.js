var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    user_name: {type: String,required: [true, 'User Name is required'],unique: true},
    email: {type: String,required: [true, 'Email is required'],unique: true},
    password: {type: String, minlength: 6}
}, {collection: 'user'});

var User = mongoose.model('User', UserSchema);
module.exports = User;