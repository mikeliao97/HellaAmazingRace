import Race from '../schemas/races';
import Results from '../schemas/results';
import gcloud from 'google-cloud';
import gCred from '../../config/gcloud/cred';
import path from 'path';

var vision = gcloud.vision;


exports.storeSavedRace = (req, res) => {
  var race = req.body;
  Race.findOne({ title: race.title }).exec((err, found) => {
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
};

exports.loadRaceData = (req, res) => {
  Race.findOne(req.body).exec((err, raceData) => {
    if (!raceData) {
      res.send('Race doesn\'t exist');
    } else {
      res.send(raceData);
    }
  });
};

exports.saveRaceResults = (req, res) => {
  let raceResults = new Results({
    title: req.body.title,
    winner: req.body.winner,
    time: req.body.time
  });

  raceResults.save((err, raceResults) => {
    if (err) { 
      throw err; 
    } else {
      res.send('Results saved.');
    }
  });
};

exports.loadRaceResults = (req, res) => {
  Results.find().exec((err, raceData) => {
    if (!raceData) {
      res.send('No previous race results...');
    } else {
      res.send(raceData);
    }
  });
}

exports.analyzePhoto = (req, res) => {
var types = [
  'label'
]

//expecting: req.body.image
// var image = req.body.image;
var image = 'http://az616578.vo.msecnd.net/files/2016/07/09/6360363022594514001256241258_SBSB.png';

//FOR DEVELOPMENT
var visionClient = vision({
  projectId: gCred.projectId,
  keyFilename: 'src/config/gcloud/quoted-hella-keyFile.json'
});

visionClient.detectLabels(image, function(err, result, apiResponse) {
  if (err) {
    console.log('Cloud Vision Error: ', err)
    res.status(500).send(err);
  } else {
    console.log(result);
  }
});
}




