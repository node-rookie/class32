var mongoose = require('mongoose')
mongoose.connect('mongodb://sunny:123456@linus.mongohq.com:10008/myclass')
exports.User = mongoose.model('User', require('./user'))
