const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin123@ds239936.mlab.com:39936/heroku_m85jlj6j', { useNewUrlParser: true });

module.exports = {};
