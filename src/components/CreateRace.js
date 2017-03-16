'use strict';

import React from 'react';
import GoogleMapReact from 'google-map-react';



export default class CreateRace extends React.Component {
  render() {

    let mapData = {
      title: 'testing',
      start: null,
      finish: null,
      checkpoints: []
    };

    const defaultMap = {
      center: {lat: 59.95, lng: 30.33},
      zoom: 11
    };

    const addMapData = (e) => {
      let value = e.target.value;
      if (value === 'start') {
        mapData.start = 'test';
      } else if (value === 'finish') {
        mapData.finish = 'another test';
      } else {
        mapData.checkpoints.push('some data');
      }
    };

    const saveRace = () => {
      $.post('/SaveRace', mapData, (something) => {
        console.log('something ', something);
      });
    };



    return (
      <div>
        <h1 className="text-center"> Create a Race</h1>
        <GoogleMapReact
          defaultCenter={defaultMap.center}
          defaultZoom={defaultMap.zoom}
        />

        <div className="text-center">
          <button type="button" className="btn btn-primary" value="start" onClick={addMapData}>Set Start</button>
          <button type="button" className="btn btn-primary"onClick={addMapData}>Set Checkpoint</button>
          <button type="button" className="btn btn-primary" value="finish" onClick={addMapData}>Set Finish</button>
        </div>
        <div className="text-center">
          <button type="button" className="btn btn-primary" onClick={saveRace}>Save Race</button>
          <button type="button" className="btn btn-primary" onClick={saveRace}>Start Race</button>
        </div>
      </div>
    );
  }
}
