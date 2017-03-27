import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default class NoDataTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      raceResults: []
    };
  }

  componentDidMount() {
    this.getRaceResults();
  }

  getRaceResults() {
    $.post('/loadRaceResults')
      .done((res) => {
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