var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hella-amazing-race');

mongoose.connection.on('error', function(error) {
  console.error(error);
});

mongoose.connection.once('open', function() {
  console.log('Mongoose connected.');
});

module.exports = mongoose;