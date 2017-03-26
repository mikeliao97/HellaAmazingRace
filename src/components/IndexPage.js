'use strict';

import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Table from './Table';


export default class IndexPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName: null,
      userPhoto: null,
    };
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

        <div className="text-center">
          <h4>
            Recent race results:
          </h4>
          <NoDataTable />
        </div>

      </div>
    );
  }
}


class NoDataTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      raceResults: []
    }
  }

  componentDidMount() {
    this.getRaceResults();
  }

  getRaceResults() {
    $.post('/loadRaceResults')
      .done((res) => {
        console.log(res);
        this.setState({
        raceResults: res
      });
    });
  }

  render() {
    return (
      <BootstrapTable data={ this.state.raceResults } options={ { noDataText: 'No results to report, run a race!' } }>
        <TableHeaderColumn dataField='title' isKey={ true }>Title</TableHeaderColumn>
        <TableHeaderColumn dataField='winner'>Winner</TableHeaderColumn>
        <TableHeaderColumn dataField='time'>Time</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}