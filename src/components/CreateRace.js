'use strict';

import React from 'react';
import RaceMap from './Map';
import Autocomplete from './Autocomplete';



export default class CreateRace extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      start: null,
      finish: null,
      checkpoints: [],
      searchData: null
    }
  }

  addMapData(e) {
    let value = e.target.value;
    if (value === 'start') {
      this.setState({
        start: 'starting point'
      });
    } else if (value === 'finish') {
      this.setState({
        finish: 'test me'
      });
    } else {
      var newArray = this.state.checkpoints.slice();
      newArray.push('some checkpoints');
      this.setState({
        checkpoints: newArray
      });
    }
    console.log(this);
  }

  saveRace() {
    $.post('/SaveRace', this.state.mapData, (something) => {
      console.log('something ', something);
    });
  }

  getDataOnSearch(locationData) {
    let formattedLocationData = {
      Place: locationData.label,
      Latitude: locationData.location.lat,
      Longitude: locationData.location.lng
    }
    this.setState({
      searchData: JSON.stringify(formattedLocationData)
    });
  }

  render() {

    const mapStyle = {
      width: '600px',
      height: '400px',
    };

    return (
      <div>

        <h1 className="text-center"> Create a Race</h1>

        <Autocomplete
          getDataOnSearch={this.getDataOnSearch.bind(this)} 
        />

        <div style={mapStyle} className="text-center">
          <RaceMap />
        </div>

        <div className="text-center">
          <button type="button" className="btn btn-primary" value="start" onClick={this.addMapData.bind(this)}>Set Start</button>
          <button type="button" className="btn btn-primary"onClick={this.addMapData.bind(this)}>Set Checkpoint</button>
          <button type="button" className="btn btn-primary" value="finish" onClick={this.addMapData.bind(this)}>Set Finish</button>
        </div>
        <div className="text-center">
          <button type="button" className="btn btn-primary" onClick={this.saveRace.bind(this)}>Save Race</button>
          <button type="button" className="btn btn-primary" onClick={this.saveRace.bind(this)}>Start Race</button>
        </div>

        <div> Start: {this.state.start} <br/>
              Checkpoints {this.state.checkpoints} <br/>
              Finish: {this.state.finish} <br/>
              Current Search: {this.state.searchData}
        </div>
      </div>
    );
  }
}
