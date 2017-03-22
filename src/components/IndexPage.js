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
    
  }

  render() {
    return (
      <div>
      <h1>You're logged in.</h1>
      </div>
    );
  }
}
