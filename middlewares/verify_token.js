var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports = function(req,res,next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token, config.jwt_secret, function(err, decoded){
            if(err) return res.status(401).send('Token not valid!');
            req.decoded = decoded;
            next();
        });
    }else{
        return res.status(403).send('Token required!');
    }
};