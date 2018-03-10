var Game = require('../models/game');
var Youtube = require('youtube-node');

exports.games_list = function(req,res){
    Game.find({}, function (err, games) {
        if(err) return res.status(404).json(err);
        res.status(200).json(games);
    });
};

exports.game_details = function (req, res) {
    Game.findById(req.params.id, function (err, game) {
        if(err) return res.status(404).json(err);
        res.status(200).json(game);
    }).populate('user').exec();
};

exports.add_game = function (req, res) {
    var newGame = new Game({
        title: req.body.title,
        creator: req.body.creator,
        year: req.body.year,
        user: req.params.user_id
    });

    var youtube = new Youtube();
    youtube.setKey('AIzaSyBiBtQcRv8jv8xiB4xUrJpKRwOFzkNegws');
    youtube.search(newGame.title + ' official trailer',1,function(err,result){
        newGame.trailer_url = result.items[0].id.videoId;

        newGame.save(function (err) {
            if(err) return res.status(422).json(err);
            res.status(200).json({message: 'Game Added Successfully.',newGame});
        });
    });
};

exports.update_game = function (req, res) {
    Game.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        function(err,game){
            if(err) return res.status(422).json(err);
            res.status(200).json({message: 'Successfully updated.'});
        }
    );
};

exports.delete_game = function(req,res){
    Game.findByIdAndRemove(req.params.id, function(err,game){
        if(err) return res.status(404).json(err);
        res.status(200).json({message: 'Successfully deleted.'});
    });
};