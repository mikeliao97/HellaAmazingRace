'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  // removing this.props.children breaks routing for some reason, leave for now
  render() {
    return (
      <div>
        <header>
        </header>
        <div>{this.props.children}</div>
        <footer>
         hello 
        </footer>
      </div>
    );
  }
}
