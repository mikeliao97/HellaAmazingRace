'use strict';

import React from 'react';

export default class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: null
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
          displayName: res.displayName
        });
      });
  }

  render() {
    return (
      <div>
      <h1>Welcome {this.state.displayName}</h1>
      </div>
    );
  }
}
