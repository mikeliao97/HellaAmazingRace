'use strict';

import React from 'react';


export default class PubMap extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.renderMap();
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

  render() {
    return (
      <div id="map"></div>
    );
  }
}
