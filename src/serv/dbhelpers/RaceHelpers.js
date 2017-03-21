import Race from '../schemas/races';

exports.storeSavedRace = (req, res) => {
  var race = req.body;
  Race.findOne(race).exec((err, found) => {
    if (!found) {
      var newRace = new Race({
        title: race.title,
        start: race.start,
        checkpoints: JSON.stringify(race.checkpoints),
        finish: race.finish
      });
      newRace.save((err, newRace) => {
        if (err) {
          throw err;
        } else {
          res.send('Race Saved');
        }
      });
    } else {
      res.send('Race name already exists');
    }
  });
}

exports.loadRaceData = (req, res) => {
  Race.findOne(req.body).exec((err, raceData) => {
    if (!raceData) {
      res.send('Race doesn\'t exist');
    } else {
      res.send(raceData);
    }
  })
}
