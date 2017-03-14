var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RaceSchema = new Schema({
  title: { type: String, required: true, unique: true },
  start: { type: String, required: true },
  finish: { type: String, required: true },
  checkpoints: { type: String, required: true },
});

var Races = mongoose.model('races', RaceSchema);

module.exports = Races;
