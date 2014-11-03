var mongoose = require('mongoose')
var Schema = mongoose.Schema

var User = new Schema({
	email:String,
	name:String,
	phone:String,
	password:String,
	headImg: String,
	picture: String,
	address: String,
	sign: String
});

module.exports = User
