var Song = require('../models/song');
var Youtube = require('youtube-node');

exports.songs_list = function(req,res) {
    Song.find({user: req.params.user_id}, function (err, songs) {
        if(err) return res.status(401).json(err);
        res.status(200).json(songs);
    })
};

exports.find_song = function (req, res) {
    Song.findById({_id: req.params.id,user: req.params.user_id}, function (err, song) {
        if(err) return res.status(401).json(err);
        res.status(200).json(song);
    })
};

exports.add_song = function (req, res) {
    var newSong = new Song({
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        year: req.body.year,
        user: req.params.user_id
    });

    // find and set youtube url
    let youtube = new Youtube();
    youtube.setKey('AIzaSyBiBtQcRv8jv8xiB4xUrJpKRwOFzkNegws');
    youtube.search(newSong.title,1,function (err, result) {
        if(err) return res.status(404).json(err);
        newSong.youtube_url = result.items[0].id.videoId;

        newSong.save(function (err) {
            if(err) return res.status(422).json(err);
            res.status(200).json({message: 'Song added successfully!',newSong});
        });
    })
};

exports.update_song = function(req,res){
    Song.findByIdAndUpdate(req.params.id,
        {$set: req.body},
        function(err,song){
            if(err) return res.status(422).json(err);
            res.status(200).json({message: 'Updated Successfully.'});
        }
    )
};

exports.delete_song = function(req,res){
    Song.findByIdAndRemove(req.params.id, function(err,song){
        if(err) return res.status(404).json(err);
        res.status(200).json({message: 'Deleted successfully.'});
    })
};