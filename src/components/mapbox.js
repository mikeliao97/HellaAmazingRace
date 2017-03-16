'use strict';

import React from 'react';


export default class PubMap extends React.Component {

  constructor(props) {
    super(props);
    console.log(this);
  }

  ComponentDidMount() {
    this.fetchPosition();
  }

  fetchPosition() {
    var lat = null;
    var lng = null;

    // sets your location as default
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var locationMarker = null;
        if (locationMarker){
          // return if there is a locationMarker bug
          return;
        }

        lat = position.coords["latitude"];
        lng = position.coords["longitude"];

       console.log(lat, lng);

      },
      function(error) {
        console.log("Error: ", error);
      },
      {
        enableHighAccuracy: true
      }
      );
    }
  }

  render() {
    return (
      <div> Hi </div>
    );
  }
}
