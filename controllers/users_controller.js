var User = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../config');

exports.user_list = function(req,res){
    User.find({}, function(err,users){
        if(err) return res.status(401).json(err);
        res.status(200).json(users);
    });
};

exports.user_details = function(req,res){
    User.findOne({'_id' : req.params.id}, function(err, user){
        if(err) return res.status(401).json(err);
        res.status(200).json(user);
    })
};

exports.add_user = function(req,res){
    var newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password.length < 6 ?
            req.body.password : bcrypt.hashSync(req.body.password, 10),
    });

    newUser.save(function(err){
        if (err) {
            return res.status(422).send(err);
        }
        res.status(200).json({message: 'User created successfully.',newUser});
    });
};

exports.update_user = function(req,res){
    delete req.body.password;
    delete req.body.email;
    User.findByIdAndUpdate(req.params.id, 
    {$set: req.body},
    function(err,user){
        if(err) return res.status(401).json(err);
        res.status(200).json({message: 'Updated successfully.'});
    });
};

exports.update_password = function(req,res){
    if(req.body.password.length < 6){
        return res.status(422).json({message: 'Password length too short!'});
    }else{
        User.findByIdAndUpdate({'_id' : req.params.id},
        {$set: {password: bcrypt.hashSync(req.body.password, 10)}},
        function(err,user){
            if(err) return res.status(401).json(err);
            res.status(200).json({message: 'Password updated successfully.'});
        });
    }
};

exports.delete_user = function(req,res){
    User.findOneAndRemove({'_id' : req.params.id}, function(err,user){
        if(err) return res.status(401).json(err);
        res.status(200).json({message: 'User deleted successfully.'});
    });
};

exports.login = function(req,res){
    User.findOne({'email' : req.body.email}, function(err,user){
        if(err || user === null){ return res.status(404).json({message: 'Email not found'});}
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(403).json({message: 'Password incorrect'});
        }else{
            var token = jwt.sign(user.toJSON(), config.jwt_secret,{
                expiresIn: 3600 * 24
            });
            res.status(200).json({user,token: token,message: 'Successfully logged in!'});
        }
    });
};