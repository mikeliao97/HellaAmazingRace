var mongoose = require('mongoose');

mongoose.connect('mongodb://jason:admin@ds135790.mlab.com:35790/hella-amazing-race');

mongoose.connection.on('error', function(error) {
  console.error(error);
});

mongoose.connection.once('open', function() {
  console.log('Mongoose connected.');
});

module.exports = mongoose;