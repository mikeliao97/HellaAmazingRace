'use strict';

import React from 'react';


export default class PubMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null
    }
  }

  componentDidMount() {
    this.renderMap();
    setInterval(() => {
      console.log('getting location');
      this.getCurrentLocation();
    }, 5000);
  }

  renderMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((location) => {
      this.setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
      console.log(this.state);
    })
  }

  render() {
    return (
      <div id="map"></div>
    );
  }
}
