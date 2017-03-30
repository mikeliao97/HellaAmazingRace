var mongoose = require('mongoose');

// mongoose.connect('mongodb://jason:admin@ds135790.mlab.com:35790/hella-amazing-race');
// mongoose.connect('mongodb://hanzhao:password123@ds145800.mlab.com:45800/amazingrace');
mongoose.connect('mongodb://Users:password@ds145800.mlab.com:45800/amazingrace');


mongoose.connection.on('error', function(error) {
  console.error(error);
});

mongoose.connection.once('open', function() {
  console.log('Mongoose connected.');
});

module.exports = mongoose;