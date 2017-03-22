var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResultSchema = new Schema({
  title: { type: String, required: true, unique: true },
  winner: { type: String, required: true },
  time: { type: String, required: true }
});

var Results = mongoose.model('results', ResultSchema);

module.exports = Results;
