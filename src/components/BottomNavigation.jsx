import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';



const messaging = <FontIcon className="material-icons">sms</FontIcon>
const route_info = <FontIcon className="material-icons">directions_run</FontIcon>
const nearbyIcon = <IconLocationOn />;

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
export default class BottomNavigationButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };
    this.select.bind(this);
  }

  select(index) {
    this.setState({selectedIndex: index});
  };


  render() {
    return (
      <Paper id={this.props.id} zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Route Info"
            icon={route_info}
            onTouchTap={() => this.select(0)}
          />
           <BottomNavigationItem
            label="Nearby!"
            icon={nearbyIcon}
            onTouchTap={() => this.select(2)}
          />
          <BottomNavigationItem
            label="Messaging"
            icon={messaging}
            onTouchTap={() => this.select(1)}
          />         
        </BottomNavigation>
      </Paper>
    );
  }
}
