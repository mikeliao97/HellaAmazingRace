'use strict';

import React from 'react';
import GoogleMapReact from 'google-map-react';


export default class RaceMap extends React.Component {
  render() {

    const mapStyle = {
      width: '400px',
      height: '400px'
    };

    const defaultProps = {
      center: {lat: 59.95, lng: 30.33},
      zoom: 11
  };

    return (
      <GoogleMapReact style={mapStyle} 
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      />
    );
  }
}
