import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';



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
      open: false,
    };
    
    this.changeRoute.bind(this);
    this.handleOpen.bind(this);
    this.handleClose.bind(this);
  }

  changeRoute(route) {
    event.preventDefault();
    console.log('trying to change route');

    //Uncomment this line route to go to that place
    this.props.history.push(route);
  }

  handleOpen() {
    var distance = this.props.distanceAway() 
    console.log('distance', distance);
    if (distance < 50) {
      this.props.history.push('/checkPoint');
    } else {
      console.log('button clicked', this);
      this.setState({open: true});
    }
  };

  handleClose() {
    console.log('button clicked to close', this);
    this.setState({open: false});
  };


  render() {
    const actions = [
      <FlatButton
        label="Got it"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />,
    ];
    return (
      <div>
          <Dialog
          title="You are not within the limits of the Checkpoint"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
          >
        </Dialog>
        <Paper id={this.props.id} zDepth={1}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Route Info"
              icon={route_info}            
              onClick={() => this.changeRoute('/route_info')}
            />
             <BottomNavigationItem
              label="Nearby!"
              icon={nearbyIcon}
              onClick={this.handleOpen.bind(this)}
            />
            <BottomNavigationItem
              label="Messaging"
              icon={messaging}
              onClick={() => this.changeRoute('/message')}
            />         
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}
