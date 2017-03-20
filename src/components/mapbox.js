'use strict';

import React from 'react';


export default class PubMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null
    }
  }

  componentDidMount() {
    setInterval(() => {
      console.log('getting location');
      this.getCurrentLocation((ready) => {
        if (ready) {
          this.renderMap();
        }
      });
    }, 5000);
  }

  renderMap() {
    var currLoc = {lat: this.state.lat, lng: this.state.lng};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: currLoc
    });
    var marker = new google.maps.Marker({
      position: currLoc,
      map: map
    });
  }

  getCurrentLocation(cb) {
    navigator.geolocation.getCurrentPosition((location) => {
      this.setState({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
      cb(true);
    })
  }

  render() {
    return (
      <div id="map"></div>
    );
  }
}
