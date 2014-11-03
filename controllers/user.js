var db = require('../models')
var async = require('async')
var gravatar = require('gravatar')
var crypto = require('crypto')

//读取用户信息
exports.get = function (email, callback) {
	db.User.findOne({
		email: email
	}, function (err, user) {
		if (err) {
			return callback(err);
		} else {
			return callback(null, user);
		}
	})
}

//添加用户
exports.addUser = function (userInfo, callback) {
	//生成密码的md5值
	var md5 = crypto.createHash('md5'),
	    password = md5.update(userInfo.password).digest('hex');
	user = new db.User
	user.name = userInfo.email.split('@')[0]
	user.email = userInfo.email
	user.password =  password
	user.headImg = "/images/noheadimg.jpg"
	user.picture = "/images/noheadimg.jpg"
	user.sign = "<空>"
	user.save(callback)
}

exports.findUserById = function (_userId, callback) {
	db.User.findOne({
		_id:_userId
	}, callback)
}

exports.findByEmailOrCreate = function (userInfo, callback) {
	db.User.findOne({
		email: userInfo.email,
		password: userInfo.password
	}, function (err, user){
		if (user) {
			callback(null, user)
		} else {
			user = new db.User
			user.name = userInfo.email.split('@')[0]
			user.email = userInfo.email
			user.password =  userInfo.password
			user.headImg = "/images/noheadimg.jpg"
			user.save(callback)
		}
	})
}

exports.modifyHeadImg = function (userId, headImg ,callback) {
	db.User.findOneAndUpdate({_id: userId}, {$set: {headImg: headImg}}, function(err,user){
		if(err){
			return callback(err);
		}else{
			return callback(err,user);
		}
	});
}

exports.modifyPicture = function (userId, picture ,callback) {
	db.User.findOneAndUpdate({_id: userId}, {$set: {picture: picture}}, function(err,user){
		if(err){
			return callback(err);
		}else{
			return callback(err,user);
		}
	});
}

exports.modifyUserInfo = function (userId, userInfo ,callback) {
	db.User.findOneAndUpdate({_id: userId}, {$set: {name: userInfo.name,phone: userInfo.phone,address: userInfo.address,sign: userInfo.sign,}}, function(err,user){
		if(err){
			return callback(err);
		}else{
			return callback(null,user);
		}
	});
}

exports.getContactList = function ( callback) {
	db.User.find({}, 'name email phone address picture sign',function(err,docs){
		if(err){
			return callback(err)
		}else{
			return callback(null,docs);
		}
	})
}
