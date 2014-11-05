var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/static'));

var Controllers = require('./controllers')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var flash = require('connect-flash')
var crypto = require('crypto')
var formidable = require('formidable')
var fs = require('fs')
var mongoStore = require('connect-mongo')(session)
var cookie = require('cookie')
var sessionStore = new mongoStore({
	url: 'mongodb://sunny:123456@linus.mongohq.com:10008/myclass'
})

app.use(flash())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
	resave:false,
	saveUninitialized:false,
	secret: 'myclass',
	cookie:{
		maxAge: 60 * 60 * 1000
	},
	store: sessionStore
}))

app.get('/api/validate', function (req, res) {
	_userId = req.session._userId
	if (_userId) {
		Controllers.User.findUserById(_userId, function (err, user) {
			if (err) {
				res.status(401).json({msg: err})
			} else {
				res.status(200).json(user)
			} 
		})
	} else {
		res.status(401).json(null)
	}
})

app.post('/api/login', function (req, res) {
	//生成密码md5值
	var md5 = crypto.createHash('md5'),
	password = md5.update(req.body.password).digest('hex');
	//检查用户是否存在
	Controllers.User.get(req.body.email, function (err, user) {
		if (!user) {
			res.status(403).json({msg: '用户不存在!'});
			return;
		}
		
		//检查密码是否一致
		if(user.password != password) {
			res.status(403).json({msg: '密码错误!'});
			return;
		}
		req.session._userId = user._id
		res.status(200).json({user: user, msg: '登录成功!'})
	})
})

app.post('/api/reg', function (req, res) {
	var email = req.body.email,
	password = req.body.password,
	password_re = req.body.password_repeat;
	//检测两次输入的密码是否一致
	if (password_re != 323232) {
		res.status(403).json({msg:'邀请码错误!'});
		return;
	}
	//检查邮箱是否已经存在
	Controllers.User.get(email,function(err, user) {
		if(user){
			res.status(200).json({msg: '用户已存在!'});
			return;
		}
	})

	//新增用户
	Controllers.User.addUser(req.body, function(err, user) {
		if (err) {
			res.status(500).json( {msg: '服务器异常,请稍后重试'})
		} else {
			req.session._userId = user._id
			res.status(200).json({user: user, msg: '注册成功'})
		}
	})
})

//app.get('/crossdomain.xml', function (req, res) {
	//res.sendFile(__dirname +"/crossdomain.xml")
//})

app.get('/api/logout', function (req, res) {
	req.session._userId = null
	res.status(401).json(null)
})

app.post('/api/uploadHeadImg', function (req, res) {
	var form =new formidable.IncomingForm();
	var path,targetPath,userId,headImg;
        form.keepExtensions = true;//keep .jpg/.png
        form.uploadDir = __dirname + '/static/images';//upload path});
		form.parse(req,function(err, fields, files){
			path=files["Filedata"].path;
			targetPath = __dirname + '/static/images/'+fields.name+"."+fields.filetype;
			userId = fields.name;
			headImg = '/images/'+fields.name+"."+fields.filetype;
		});//bind event handler
		//form.on('file', function(name, file) {
			//path = file.path;	
			//console.log(file.name)					
		//})
		//form.on('progress',function(bytesReceived, bytesExpected){
			//console.log(((bytesReceived / bytesExpected)*100)+"% uploaded");
		//});
		form.on("end",function(){
			fs.renameSync(path,targetPath);
			Controllers.User.modifyHeadImg(userId,headImg,function(err,user){
				if(err){
					res.status(200).json({success:false,msg:'修改头像失败'});
				}else{
					res.status(200).json({success:true,msg:'修改头像成功',user:user});
				}
			})
		})
})

app.post('/api/uploadPicture', function (req, res) {
	var form =new formidable.IncomingForm();
	var path,targetPath,userId,picture;
        form.keepExtensions = true;//keep .jpg/.png
        form.uploadDir = __dirname + '/static/images';//upload path});
		form.parse(req,function(err, fields, files){
			path=files["Filedata"].path;
			targetPath = __dirname + '/static/images/'+fields.name+"picture."+fields.filetype;
			userId = fields.name;
			picture = '/images/'+fields.name+"picture."+fields.filetype;
		});//bind event handler
		//form.on('file', function(name, file) {
			//path = file.path;	
			//console.log(file.name)					
		//})
		//form.on('progress',function(bytesReceived, bytesExpected){
			//console.log(((bytesReceived / bytesExpected)*100)+"% uploaded");
		//});
		form.on("end",function(){
			fs.renameSync(path,targetPath);
			Controllers.User.modifyPicture(userId,picture,function(err,user){
				if(err){
					res.status(200).json({success:false,msg:'修改形象失败'});
				}else{
					res.status(200).json({success:true,msg:'修改形象成功',user:user});
				}
			})
		})
})

app.post('/api/modifyUserInfo',function (req, res) {
	_userId = req.session._userId
	if (_userId) {
		//console.log(req.body)
		Controllers.User.modifyUserInfo(_userId, req.body, function (err, user) {
			if (err) {
				res.status(401).json({msg: err})
			} else {
				res.json(user)
			} 
		})
	} else {
		res.redirect("/login")
	}
})

app.get('/api/getContactList',function (req, res) {
		Controllers.User.getContactList(function (err, users) {
			if (err) {
				res.status(401).json({msg: err})
			} else {
				res.json(users)
			} 
		})
})

app.listen(port);
console.log('service have started');
