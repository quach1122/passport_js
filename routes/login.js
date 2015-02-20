/**
 * Created by andy on 2/18/2015.
 */
/**
 * Created by andy on 2/18/2015.
 */
var passport = require('passport');
var Customer = require('../model/customers');
var router = require('express').Router();

var currentUser = '';
router.get('/', function (req, res) {
    console.log('req.userrrrr ' + req.user);
    res.render('login');
});
router.get('/validate', function (req, res) {
    console.log('req.userrrrr ' + req.user);
    if (!req.user) {
        res.render('login');
    }
    else {
        res.status(200).json({status: 'online'});
    }
});

router.post('/register', function (req, res) {

    Customer.register(new Customer({username: req.body.username}), req.body.password, function (err, customer) {
        if (err) {
            console.log('error');
        }
        else {
            console.log('customer ' + req.user);
            passport.authenticate('local')(req, res, function () {
                res.status(201).json({message: 'Welcome Register', user: req.user});
                currentUser = req.user.username;
            });
        }
    });
});


router.post('/', passport.authenticate('local', {failureRedirect: '/'}), function (req, res, err) {
    res.status(200).json({status: 'online', user: req.user});
});

router.get('/home', function (req, res, err) {
    if (req.user) {
        console.log('/home ' + req.user);
        res.status(200).json({status: 'online'});
    }
    else {
        res.status(200).json({status: 'offline'});
    }

});

router.get('/logout', function (req, res) {
    req.logout();
    res.status(200).json({status: 'offline'});
});
module.exports = router;