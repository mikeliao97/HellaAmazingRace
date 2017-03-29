'use strict';

import React from 'react';
import Map from './Map';
import Autocomplete from './Autocomplete';
import Timer from './Timer';
import RaisedButton from 'material-ui/RaisedButton';
import UsersButton from './Users.jsx'
import BottomNavigationButtons from './BottomNavigation.jsx';



export default class RunRace extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchedRace: 'test',
      markers: null,
      title: null,
      raceComplete: false,
      raceRunning: false
    };

    // get users name for saving race results when page is loading.
    $.get('/username')
      .done((res) => {
        window.currentUser = res.displayName;
      });
  }

  searchedRaceNameChange(e) {
    this.setState({
      searchedRace: e.target.value
    });
  }

  loadRace() {
    let raceTitle = { title: this.state.searchedRace };

    $.post('/loadRace', raceTitle, (response) => {
      if (response === 'Race doesn\'t exist') {
        alert('Race title doesn\'t exist, search again.');
      } else {
        window.checkpointsLoaded = false;
        this.setState({
          markers: response,
          title: this.state.searchedRace
        });
      }
    });
  }

  verifyLocation() {
    // if not running, start running race when checking start checkpoint location
    if (!this.state.raceRunning) {
      this.setState({
        raceRunning: true
      });
    }

    let currLocation = new google.maps.LatLng( window.currentLocation[0], window.currentLocation[1] );
    let checkpointLocation = new google.maps.LatLng( window.markers[0].getPosition().lat(), window.markers[0].getPosition().lng() );
    let distance = google.maps.geometry.spherical.computeDistanceBetween(currLocation, checkpointLocation);

    if (distance < 50) {
      window.markers[0].setMap(null);
      window.markers.shift();
      if (!window.markers.length) {
        alert('Congrats, you have finished the race!');
        this.setState({
          raceComplete: true
        });
      } else {
        window.markers[0].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
        alert('Continue to next checkpoint!');
      }
    } else {
      alert(`You are still ${Math.floor(distance)} meters away.`);
    }
  }

  

  render() {

    return (
      <div className="raceMapContainer">
        <Map markers={this.state.markers}/>

        <div id="runRaceNavBar"> 
            <UsersButton id="users"/>
            <Timer id="timer" raceTitle={'Amazing Racing'} running={true} />
        </div>
        <BottomNavigationButtons id="runRaceFooterBar" />
      </div>
    );
  }
}