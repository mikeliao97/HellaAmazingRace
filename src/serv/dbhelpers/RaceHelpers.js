import Race from '../schemas/races';
import Results from '../schemas/results';

exports.storeSavedRace = (req, res) => {
  var race = req.body;
  Race.findOne(race).exec((err, found) => {
    console.log(race.checkpoints);
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

exports.saveRaceResults = (req, res) => {
  let raceResults = new Results({
    title: req.body.title,
    winner: req.body.winner,
    time: req.body.time
  });

  raceResults.save((err, raceResults) => {
    if (err) { throw err; }
    else {
      res.send('Results saved.');
    }
  });
}







