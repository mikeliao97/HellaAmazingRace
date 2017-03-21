'use strict';

import React from 'react';
import GoogleMapReact from 'google-map-react';


export default class RaceMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: 37.8123698,
      lng: -122.00116100000002,
      // lat: null,
      // lng: null
    }
    window.markers = [];
  }



  getCurrentLocation(cb) {
    navigator.geolocation.getCurrentPosition((location) => {
      this.setState({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });

      if (cb) {
        cb('Done fetching location, ready.');
      }
    })
  }



  componentDidMount() {
    this.renderMap();

    // this.getCurrentLocation((ready) => {
    //   if (ready) {
    //     // one time map render on page ready
    //     this.renderMap();
    //   }
    // });
  }



  renderMap() {
    // save reference to component functions since google maps event listeners are goofy.
    window.component = this;

    let currLoc = {lat: this.state.lat, lng: this.state.lng};
    // save map to window to be able to redraw as current location changes
    window.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: currLoc

    });
    window.marker = new google.maps.Marker({
      position: currLoc,
      map: map
    });

    // init event listeners for map
    map.addListener('click', function(event) {
      component.addMarker(event.latLng);
    });


    marker.setAnimation(google.maps.Animation.BOUNCE);
  }



  addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    markers.push(marker);
  }



  render() {

    return (
      <div className="text-center">
        <div>
            <button type="button" className="btn btn-primary" value="hide">Hide All Markers</button>
            <button type="button" className="btn btn-primary" value="show">Show All Markers</button>
            <button type="button" className="btn btn-primary" value="delete">Delete All Markers</button>
        </div>
        <div id="map"/>
      </div>
    );
  }

}
