import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default class Users extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
    console.log('clicked button');
  };



  handleRequestClose() {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div id={this.props.id}>
        <RaisedButton
          onTouchTap={this.handleTouchTap.bind(this)}
          onClick={this.handleTouchTap.bind(this)}
          label="Show Racers"
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose.bind(this)}
        >
          <Menu>
            <MenuItem primaryText="Whitney" />
            <MenuItem primaryText="Hello" />
            <MenuItem primaryText="somethingelse" />
            <MenuItem primaryText="Sign out" />
          </Menu>
        </Popover>
      </div>
    );
  }
}