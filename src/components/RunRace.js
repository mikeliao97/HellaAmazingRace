'use strict';

import React from 'react';
import PubMap from './MapBox';
import Autocomplete from './Autocomplete';
import Timer from './Timer';



export default class RunRace extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchedRace: 'test',
      markers: null
    }
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
        this.setState({
          markers: response
        });
      }
    });
  }

  render() {
    return (
      <div className="text-center">
        <h1 className="text-center"> Run a Race</h1>

        <Timer />

        <form>
          <input type="text" value={this.state.searchedRace} onChange={this.searchedRaceNameChange.bind(this)}/>
          <button type="button" className="btn btn-primary" onClick={this.loadRace.bind(this)}>Load Race</button>
        </form>

        <PubMap markers={this.state.markers}/>
      </div>
    );
  }
}