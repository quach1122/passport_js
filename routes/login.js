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
    console.log('req.user '+req.user);
    //for(var p in req){
    //    console.log(p );
    //}
    res.render('login');
});

router.get('/register',function(){
   console.log('reggggisterd');
});

router.post('/register', function (req, res) {

    Customer.register(new Customer({username: req.body.username}), req.body.password, function (err, customer) {
        if(err){
            console.log('error');
        }
        else{
            console.log('customer '+customer.username);
            passport.authenticate('local')(req, res, function () {
                res.status(201).json({message: 'Welcome Register', user: req.user});
                currentUser = req.user.username;
            });
        }
    });
});



router.post('/', passport.authenticate('local',{ failureRedirect: '/' }), function(req, res,err) {
    //res.redirect('/');
    //console.log('req.user '+req.user);
    if(req.user.username){
        console.log('user in database');
        currentUser = req.user.username;
        res.status(200).json({status: 'online', user:req.user});
    }
});

router.get('/home', function(req, res,err){
    console.log('current user ' + currentUser);
    if(currentUser != null || currentUser != undefined){
        res.status(200).json({status: 'online', user:req.user});
    }
});

router.get('/logout/', function(req, res) {
    currentUser = undefined;
    res.status(200).json({status: 'offline'});
});
module.exports = router;