import React from 'react';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.onPlacesChanged = this.onPlacesChanged.bind(this);
  }
  render() {
    return <input className="search-box" ref="input" {...this.props} type="text"/>;
  }
  onPlacesChanged(){
    if (this.props.onPlacesChanged) {
      this.props.onPlacesChanged(this.searchBox.getPlaces());
    }
  };
  componentWillUpdate() {
    if(this.props.bounds){
      this.searchBox.setBounds();
    }
  }
  componentDidMount() {
    var input = this.refs.input;
    this.searchBox = new google.maps.places.SearchBox(input);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }
}
SearchBox.propTypes = {
  placeholder: React.PropTypes.string,
  bounds: React.PropTypes.any,
  onPlacesChanged: React.PropTypes.func
};
export default SearchBox;