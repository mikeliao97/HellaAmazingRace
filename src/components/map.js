'use strict';

import React from 'react';
import GoogleMapReact from 'google-map-react';


export default class RaceMap extends React.Component {

  constructor(props) {
    super(props);
  }


  getLocation() {
    console.log(navigator.geolocation.getCurrentPosition());
  }

  render() {


    const defaultProps = {
      center: { lat: 37.78, lng: -122.4 },
      zoom: 15
  };

    return (
      <GoogleMapReact
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      />
    );
  }
}
