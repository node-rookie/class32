var mongoose = require('mongoose')
<<<<<<< HEAD
mongoose.connect('mongodb://sunny:123456@linus.mongohq.com:10008/myclass')
=======
mongoose.connect('mongodb://suny:123456@linus.mongohq.com:10008/myclass')
>>>>>>> 0d1c1789a81b475c9048ae2c9cafa23b06765426
exports.User = mongoose.model('User', require('./user'))
