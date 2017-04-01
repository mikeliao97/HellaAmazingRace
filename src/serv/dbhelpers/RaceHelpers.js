import Race from '../schemas/races';
import Results from '../schemas/results';
import gcloud from 'google-cloud';
import gCred from '../../config/gcloud/cred';
import path from 'path';
import fileUpload from 'express-fileupload';
import gPlaceType from '../../config/gcloud/googlePlaceType';

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
  console.log('req body', req.body);
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
    res.json(data);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
}


exports.getObjective = (req, res) => {
  let category = req.params.categoryType; 
  //GEOLOCATION BY GOOGLE PLACES
  // let currentLng = req.params.currentLng;
  // let currentLat = req.params.currentLat;
  // if(categoryType !== 'label') {    
  //   let radius = 500 //meters
  //   let key = gCred.key;
  //   let type = gPlaceType.googlePlaceType[Math.floor(Math.random() * gPlaceType.googlePlaceType.length)];

  //   var https = require('https');
  //   var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + "location=" + currentLat + "," + currentLng + "&radius=" + radius + "&type=" + type + "&keyword=" + categoryType + "&key=" + key;
  //   console.log('url: ', url);
  //   https.get(url, function(response) {
  //     var body ='';
  //     response.on('data', function(chunk) {
  //       body += chunk;
  //     });
  //     response.on('end', function() {
  //       console.log('end body: ', body);
  //         var places = JSON.parse(body);
  //         var locations = places.results;
  //         var randLoc = locations[Math.floor(Math.random() * locations.length)] || 'Try Again';
  //         res.json(randLoc);
  //     });
  //   }).on('error', function(e) {
  //     console.log("Got error: " + e.message);
  //   });
  // } else {
    var objectives = {
      animals: ['cat', 'dog', 'bird', 'person', 'aligator'],
      travel: ['car', 'bus', 'train', 'boat', 'plane'],
      stationaries: ['table', 'musical instrument', 'pencil', 'chair', 'toy', 'computer']
      };
    var randomObject = objectives[category][Math.floor(Math.random() * objectives[category].length)];
    res.json(randomObject);

    // var objectives = ['chair', 'machine', 'musical instrument', 'toy', 'car', 'bus', 'person', 'glasses', 'hair'];
    // var randomObject = objectives[Math.floor(Math.random() * objectives.length)];
    // res.json(randomObject);
  // }
}

exports.analyzePhoto = (req, res) => {
  let categoryType = req.params.categoryType;

  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }
  let image = req.files.file.data;
  console.log('image in file: ', image);

  //FOR DEVELOPMENT
  var visionClient = vision({
    projectId: gCred.projectId,
    keyFilename: 'src/config/gcloud/quoted-hella-keyFile.json'
  });

  // var analysisFunctions = {
  //   'label': visionClient.detectLabels(image),
  //   'logos': visionClient.detectLogos(image),
  //   'landmarks': visionClient.detectLandmarks(image)
  // };

  // analysisFunctions[categoryType]
  //   .then((results) => {
  //     res.json(results);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(err);
  //   })

    visionClient.detectLabels(image, function(err, result) {
      if (err) {
        console.log('Error ', err);
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
};




