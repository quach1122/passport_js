/**
 * Created by andy on 2/18/2015.
 */
/**
 * Created by andy on 2/18/2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Customer = new Schema({
    username: String,
    password: String
});

Customer.plugin(passportLocalMongoose);

module.exports = mongoose.model('Customer', Customer);