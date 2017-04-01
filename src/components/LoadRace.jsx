'use strict';

import React from 'react';
import PubMap from './PubMap';
import Autocomplete from './Autocomplete';
import Timer from './Timer';
import Capture from './Capture';
import RaisedButton from 'material-ui/RaisedButton';
import UsersButton from './UsersButton.jsx'
import BottomNavigationButtons from './BottomNavigation.jsx';
import RunRace from './RunRace'

export default class LoadRace extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchedRace: 'test',
      markers: null,
      title: null,
      raceComplete: false,
      raceRunning: false,
      opponent: '',
      showMap: false
    };

    // get users name for saving race results when page is loading.
    $.get('/username')
      .done((res) => {
        window.currentUserPic = res.photos[0].value;
        window.currentUser = res.displayName;
      });
  }

  searchedRaceNameChange(e) {
    console.log('typed', e.target.value);
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
          title: this.state.searchedRace,
          showMap: true
        });
      }
    });
  }



  render() {
    return (
      <div className="raceMapContainer">
      {
        this.state.showMap ? 
        <RunRace />
        : 
        (
          <div>
            <input type='text' onChange={this.searchedRaceNameChange.bind(this)} />
            <button title="Learn More" color="#841584" onClick={this.loadRace.bind(this)}> LoadRace </button>
          </div>
        )
      }
      </div>
    );
  }
}