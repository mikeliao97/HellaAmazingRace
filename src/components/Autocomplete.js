'use strict';

import React from 'react';
import Geosuggest from 'react-geosuggest';

export default class Autocomplete extends React.Component {
  render() {
    return (
      <div>
        <Geosuggest className="geosuggest"/>
      </div>
    );
  }
}
