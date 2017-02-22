import React, {PropTypes, Component} from 'react';

const greatPlaceStyle = {
  background: 'url("images/bike_location_icon.png") no-repeat',
  backgroundSize: 'contain',
  width: 40,
  height: 40,
  top: -40,
  left: -20,
  position: 'absolute'
};
export default class Maker extends Component {
  render() {
    return (
       <div style={greatPlaceStyle}>
         {this.props.hover?'Y':'N'}
       </div>
    );
  }
}
Maker.propTypes = {
  hover: PropTypes.bool
};