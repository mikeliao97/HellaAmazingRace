'use strict';

import React from 'react';
import GoogleMapReact from 'google-map-react';


export default class RaceMap extends React.Component {
  render() {

    const defaultProps = {
      center: {lat: 59.95, lng: 30.33},
      zoom: 11
  };

    return (
      <GoogleMapReact
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      />
    );
  }
}
