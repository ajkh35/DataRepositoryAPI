var express = require('express');
var router = express.Router();
var verifyToken = require('../middlewares/verify_token');
var users_controller = require('../controllers/users_controller');

// Api routes
router.get('/', function(req,res){
    res.status(200).send('Welcome to DataRepository.(Please go to repositoryworks.com/help)');
});

router.get('/api/help', function(req,res){
    res.status(200).send('Go to repositoryworks.com/api/login to access the API.');
});

// User routes
router.get('/api/users', verifyToken, users_controller.user_list);
router.get('/api/users/:id', verifyToken, users_controller.user_details);
router.post('/api/users', verifyToken, users_controller.add_user);
router.put('/api/users/:id', verifyToken, users_controller.update_user);
router.put('/api/users/:id/password', verifyToken, users_controller.update_password);
router.delete('/api/users/:id', verifyToken, users_controller.delete_user);

// Login route
router.post('/api/login', users_controller.login);

module.exports = router;