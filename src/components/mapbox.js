'use strict';

import React from 'react';


export default class PubMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // uncomment when navigator geolocation stops working randomly
      // lat: 37.8123698,
      // lng: -122.00116100000002,
      lat: null,
      lng: null,
      checkpointsLoaded: false
    }
    window.lineCoords = [];
    window.markers = [];
  }



  componentDidMount() {
    this.pubnubConnect();


    // uncomment when navigator geolocation stops working randomly
    // this.renderMap();

    this.getCurrentLocation((ready) => {
      if (ready) {
        // one time map render on page ready
        this.renderMap();
      }
    });

    // watch for location changes
    setInterval(() => {
      this.getCurrentLocation();
    }, 3000);
  }



  componentDidUpdate() {
    // when current location in state changes, redraw map with path
    pubnub.publish({
      channel:pnChannel, 
      message: {
        lat: this.state.lat,
        lng:this.state.lng, 
        markers: this.props.markers
      }
    });
  }



  renderMap() {
    let currLoc = {lat: this.state.lat, lng: this.state.lng};
    lineCoords.push(new google.maps.LatLng(this.state.lat, this.state.lng));
    // save map to window to be able to redraw as current location changes
    window.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: currLoc

    });
    window.marker = new google.maps.Marker({
      position: currLoc,
      map: map
    });
    marker.setAnimation(google.maps.Animation.BOUNCE);

  }



   getCurrentLocation(cb) {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition((location) => {
      this.setState({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });

      if (cb) {
        cb('Done fetching location, ready.');
      }
    }, (err) => {
      console.log('error occurred: ', err);
    }, options)
  }



  redrawMap(payload) {
    console.log('updating current location marker');
    let lat = payload.message.lat;
    let lng = payload.message.lng;

    if (payload.message.markers) {
      let markersArr = this.generateMarkersArray(payload.message.markers);

      // clear out old checkpoint markers first
      // if (window.markers.length) {
      //   while (markers.length) {
      //     console.log(markers);
      //     markers[markers.length - 1].setMap(null);
      //     markers[markers.length - 1] = null;
      //     markers.splice(0, markers.length - 1);
      //   }
      // }

      // add most recent search checkpoints
      markersArr.forEach((location, order) => {
        this.createMarker(location, order);
      });
    }


    map.setCenter({lat:lat, lng:lng, alt:0});
    marker.setPosition({lat:lat, lng:lng, alt:0});

    lineCoords.push(new google.maps.LatLng(lat, lng));

    let lineCoordinatesPath = new google.maps.Polyline({
      path: window.lineCoords,
      geodesic: true,
      strokeColor: '#2E10FF'
    });

    lineCoordinatesPath.setMap(map);
  }



  createMarker(location, order) {
    order += 1;
    let contentString = `<p> Checkpoint ${order}</p>`

    // create popup window to be shown on marker click
    var infoWindow = new google.maps.InfoWindow({
      content: contentString
    });

    let checkpointMarker = new google.maps.Marker({
      position: location,
      title: `Checkpoint ${order}`
    });

    checkpointMarker.addListener('click', () => {
      infoWindow.open(map, checkpointMarker);
    });

    checkpointMarker.setMap(map);
    window.markers.push(checkpointMarker);
  }



  generateMarkersArray(markers) {
      let markersArr = [];
      markers.start = JSON.parse(markers.start);
      markers.checkpoints = JSON.parse(markers.checkpoints);
      markers.finish = JSON.parse(markers.finish);

      // push start
      markersArr.push({lat: markers.start.Latitude, lng: markers.start.Longitude});

      // push all checkpoints
      markers.checkpoints.forEach((marker) => {
        marker = JSON.parse(marker);
        markersArr.push({lat: marker.Latitude, lng: marker.Longitude});
      });

      // push finish
      markersArr.push({lat: markers.finish.Latitude, lng: markers.finish.Longitude});

      return markersArr;
  }



  pubnubConnect() {
    window.pnChannel = "map-channel";
    window.pubnub = new PubNub({
      publishKey: 'pub-c-1e471fcb-f49a-481a-84ae-32b4e950ffa8',
      subscribeKey: 'sub-c-00a667ae-0a73-11e7-9734-02ee2ddab7fe'
    });
    pubnub.subscribe({channels: [pnChannel]});
    pubnub.addListener({message:this.redrawMap.bind(this)});
  }



  render() {
    return (
      <div id="map"></div>
    );
  }
}
