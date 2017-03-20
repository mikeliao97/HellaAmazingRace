'use strict';

import React from 'react';
import PubMap from './mapbox';
import Autocomplete from './Autocomplete';



export default class RunRace extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const mapStyle = {
      width: '600px',
      height: '400px',
    };

    return (
      <div>
        <h1 className="text-center"> Run a Race</h1>
        <div style={mapStyle} className="text-center">
          <PubMap />
        </div>
      </div>
    );
  }
}