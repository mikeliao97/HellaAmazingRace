import Race from '../schemas/races';
import Results from '../schemas/results';
import gcloud from 'google-cloud';
import gCred from '../../config/gcloud/cred';
import path from 'path';
import fileUpload from 'express-fileupload';

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

exports.getRaces = (req, res) => {
  Race.find({})
  .then((data) =>  {    
    console.log('data', data);
    res.json(data);
  })
  .catch((err) => {
    console.log('errr', err);
    res.status(500).send(err);
  })
}


exports.getObjective = (req, res) => {

  let categoryType = req.params.categoryType; 
  let currentLng = req.params.currentLng;
  let currentLat = req.params.currentLat;
  console.log('currentLn', currentLng)
  console.log('currentLat', currentLat)
  console.log('categoryType', categoryType);
  res.status(200).send({
    'categoryType': categoryType,
    'lat': currentLat,
    'ln': currentLng,
  });
  if(categoryType !== 'label') {    
    let currentLng = req.params.currentLng;
    let currentLat = req.params.currentLat;
    let radius = 50 //meters
    let key = gCred.key;

    var https = require('https');
    var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + "location=" + currentLat + "," + currentLng + "&radius=" + radius + "&keyword=" + categoryType + "&key=" + key;
    console.log('url: ', url);
    https.get(url, function(response) {
      var body ='';
      response.on('data', function(chunk) {
        body += chunk;
      });
      response.on('end', function() {
        var places = JSON.parse(body);
        var locations = places.results;
        var randLoc = locations[Math.floor(Math.random() * locations.length)];

        res.json(randLoc);
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  } else {
    console.log('im here');
    var objectives = ['chair', 'machine', 'musical instrument', 'toy', 'car', 'bus'];
    var randomObject = objects[Math.floor(Math.random() * objectives.length)];
    res.json(randomObject);
  }
}

exports.analyzePhoto = (req, res) => {
  let categoryType = req.params.categoryType;

  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }
  let image = req.files.file.data;

  //FOR DEVELOPMENT
  var visionClient = vision({
    projectId: gCred.projectId,
    keyFilename: 'src/config/gcloud/quoted-hella-keyFile.json'
  });

  var analysisFunctions = {
    'label': visionClient.detectLabels(image),
    'logos': visionClient.detectLogos(image),
    'landmarks': visionClient.detectLandmarks(image)
  };

  analysisFunctions[categoryType]
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
      res.status(500).send(err);
    })
};




