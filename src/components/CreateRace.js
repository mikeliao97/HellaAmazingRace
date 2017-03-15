'use strict';

import React from 'react';

export default class CreateRace extends React.Component {
  render() {

    // const buttonSpace = {
    //   height: '5px'
    // };

    return (
      <div>
        <h1> Create a Race</h1>
        <div className="text-center">
          <button type="button" className="btn btn-primary">Set Start</button>
          <button type="button" className="btn btn-primary">Set Checkpoint</button>
          <button type="button" className="btn btn-primary">Set Finish</button>
        </div>
        <div className="text-center">
          <button type="button" className="btn btn-primary">Save Race</button>
          <button type="button" className="btn btn-primary">Start Race</button>
        </div>
      </div>
    );
  }
}
