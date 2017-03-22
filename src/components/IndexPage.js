'use strict';

import React from 'react';

export default class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: null,
      userPhoto: null
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    $.get('/username')
      .done((res) => {
        // allow all components access to current user name
        window.currentUser = res.displayName;
        this.setState({
          displayName: res.displayName,
          userPhoto: res.photos[0].value
        });
      });
  }

  render() {
    return (
      <div>

        <div className="text-center">
          <img className="img-circle" src={this.state.userPhoto}/>
          <span><h1>Welcome {this.state.displayName}</h1></span>
        </div>

        <div>
          Past 10 completed race results will go here
        </div>

      </div>
    );
  }
}
