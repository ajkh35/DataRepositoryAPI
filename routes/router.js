var express = require('express');
var router = express.Router();
var verifyToken = require('../middlewares/verify_token');
var users_controller = require('../controllers/users_controller');
var songs_controller = require('../controllers/songs_controller');
var movies_controller = require('../controllers/movies_controller');
var games_controller = require('../controllers/games_controller');

// Api routes
router.get('/', function(req,res){
    res.status(200).json({message: 'Welcome to DataRepository.(Please go to repositoryworks.com/help)'});
});

router.get('/api/help', function(req,res){
    res.status(200).json({message: 'Go to repositoryworks.com/api/login to access the API.'});
});

// Login route
router.post('/api/login', users_controller.login);

// User routes
router.get('/api/users', verifyToken, users_controller.user_list);
router.get('/api/users/:id', verifyToken, users_controller.user_details);
router.post('/api/users', users_controller.add_user);
router.put('/api/users/:id', verifyToken, users_controller.update_user);
router.put('/api/users/:id/password', verifyToken, users_controller.update_password);
router.delete('/api/users/:id', verifyToken, users_controller.delete_user);

// Songs routes
router.get('/api/songs/:user_id', verifyToken, songs_controller.songs_list);
router.get('/api/songs/:user_id/:id', verifyToken, songs_controller.find_song);
router.post('/api/songs/:user_id', verifyToken, songs_controller.add_song);
router.put('/api/songs/:id', verifyToken, songs_controller.update_song);
router.delete('/api/songs/:id', verifyToken, songs_controller.delete_song);

// Movies routes
router.get('/api/movies/:user_id', verifyToken, movies_controller.movies_list);
router.get('/api/movies/:user_id/:id', verifyToken, movies_controller.movie_details);
router.post('/api/movies/:user_id', verifyToken, movies_controller.add_movie);
router.put('/api/movies/:id', verifyToken, movies_controller.update_movie);
router.delete('/api/movies/:id', verifyToken, movies_controller.delete_movie);

// Games routes
router.get('/api/games/:user_id', verifyToken, games_controller.games_list);
router.get('/api/games/:user_id/:id', verifyToken, games_controller.game_details);
router.post('/api/games/:user_id', verifyToken, games_controller.add_game);
router.put('/api/games/:id', verifyToken, games_controller.update_game);
router.delete('/api/games/:id', verifyToken, games_controller.delete_game);

module.exports = router;