var Movie = require('../models/movie');
var Youtube = require('youtube-node');

exports.movies_list = function(req,res){
    Movie.find({user: req.params.user_id}, function (err, movies) {
        if(err) return res.status(404).json(err);
        res.status(200).json(movies);
    });
};

exports.movie_details = function(req, res) {
    Movie.findById(req.params.id, function (err, movie) {
        if(err) return res.status(404).json(err);
        res.status(200).json(movie);
    }).populate('user').exec()
};

exports.add_movie = function(req,res){
    var newMovie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year,
        user: req.params.user_id
    });

    var youtube = new Youtube();
    youtube.setKey('AIzaSyBiBtQcRv8jv8xiB4xUrJpKRwOFzkNegws');
    youtube.search(newMovie.title + ' official trailer',1,function(err,result){
        if(err) return res.status(404).json(err);
        newMovie.trailer_url = result.items[0].id.videoId;

        newMovie.save(function (err) {
            if(err) return res.status(422).json(err);
            res.status(200).json({message: 'Movie added successfully.',newMovie});
        });
    });
};

exports.update_movie = function(req,res){
    Movie.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        function(err,movie){
            if(err) return res.status(422).json(err);
            res.status(200).json({message: 'Updated Successfully.'});
        }
    );
};

exports.delete_movie = function(req,res){
    Movie.findByIdAndRemove(req.params.id, function (err, movie) {
        if(err) return res.status(404).json(err);
        res.status(200).json({message: 'Deleted Successfully.'});
    });
};