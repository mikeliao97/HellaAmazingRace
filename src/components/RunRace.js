'use strict';

import React from 'react';
import PubMap from './mapbox';
import Autocomplete from './Autocomplete';



export default class RunRace extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchedRace: 'test'
    }
  }

  searchedRaceNameChange(e) {
    this.setState({
      searchedRace: e.target.value
    });
  }

  loadRace() {
    let raceTitle = { title: this.state.searchedRace.toLowerCase() }
    console.log(raceTitle);
    // $.post('/loadRace', JSON.stringify(raceTitle));
  }

  render() {

    const mapStyle = {
      width: '600px',
      height: '400px',
    };

    return (
      <div>
        <h1 className="text-center"> Run a Race</h1>

        <form>
          <input type="text" value={this.state.searchedRace} onChange={this.searchedRaceNameChange.bind(this)}/>
          <button type="button" className="btn btn-primary" onClick={this.loadRace.bind(this)}>Load Race</button>
        </form>

        <div style={mapStyle} className="text-center">
          <PubMap />
        </div>
      </div>
    );
  }
}