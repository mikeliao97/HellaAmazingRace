import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 200,
  },
};

export default class DropDownMenuSimpleExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};
    this.handlechange = this.handleChange.bind(this);
  }

  handleChange(event, index, value){
    this.setState({value});
  } 

  render() {
    return (
      <div>
        <DropDownMenu className="highZ">
          <MenuItem value={1} primaryText="Never" />
          <MenuItem value={2} primaryText="Every Night" />
          <MenuItem value={3} primaryText="Weeknights" />
          <MenuItem value={4} primaryText="Weekends" />
          <MenuItem value={5} primaryText="Weekly" />
        </DropDownMenu>            
      </div>
    );
  }
}