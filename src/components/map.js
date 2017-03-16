'use strict';

import React from 'react';
import GoogleMapReact from 'google-map-react';


export default class RaceMap extends React.Component {
  render() {

    const defaultProps = {
      center: {lat: -122.4, lng: 37.78},
      zoom: 10
  };

    return (
      <GoogleMapReact
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      />
    );
  }
}
