'use strict';

import React from 'react';
import PubMap from './PubMap';
import Autocomplete from './Autocomplete';
import Timer from './Timer';
import Capture from './Capture';
import RaisedButton from 'material-ui/RaisedButton';
import UsersButton from './UsersButton.jsx'
import BottomNavigationButtons from './BottomNavigation.jsx';
import loadRaceDropDown from './loadRaceDropDown'
import RunRace from './RunRace'


export default class LoadRace extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchedRace: 'test',
      markers: null,
      title: null,
      raceComplete: false,
      raceRunning: false,
      opponent: '',
      showMap: false,
      races: [],
      value: 1
    };

    // get users name for saving race results when page is loading.
    $.get('/username')
      .done((res) => {
        window.currentUserPic = res.photos[0].value;
        window.currentUser = res.displayName;
      });

    $.get('/Races')
     .then((data) => {
      var races = data.map((race) => {
        return race.title;
      })

      console.log('races on client', races);
      this.setState({races: races});
    });


     var otherThis = this;
     $('html').on('click', 'li', function(){
      const raceName = $(this).text();
      alert($(this).text());
      otherThis.setState({searchedRace: raceName}, function() {
        otherThis.loadRace();      
        otherThis.setState({showMap: true});
      });
    });

  }

  searchedRaceNameChange(e) {
    console.log('typed', e.target.value);
    this.setState({
      searchedRace: e.target.value
    });
  }

  loadRace() {
    var searchedRace = this.state.searchedRace.trim(); 
    let raceTitle = { title: searchedRace };
    
    $.post('/loadRace', raceTitle, (response) => {
      if (response === 'Race doesn\'t exist') {
        alert('Race title doesn\'t exist, search again.');
      } else {
        window.checkpointsLoaded = false;
        console.log('response', response);
        this.setState({
          markers: response,
          title: this.state.searchedRace,
          showMap: true
        }, function() {
          console.log('the markers are here', this.state.markers);
        });


      }
    });
  }


  render() {
    return (
      <div className="raceMapContainer">
      {
        this.state.showMap ? (<RunRace history={this.props.history} 
          markers={this.state.markers} 
          raceName={this.state.title.trim()} />): 
        <div>         
          <h1> pls render </h1>  
          <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Dropdown Example
            <span className="caret"></span></button>
            <ul className="dropdown-menu">
              {
                this.state.races.map((race) => {
                  return (<li> <a href="#">{race}</a> </li>);
                })
              }
            </ul>
          </div>
        </div>
      }
      </div>
    );
  }
}