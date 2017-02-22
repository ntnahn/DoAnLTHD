import React, {Component, PropTypes} from 'react';
import GoogleMap from 'google-map-react';
import Maker from './Maker.js';
function createMapOptions(maps) {
  // next props are exposed at maps
  // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
  // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
  // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
  // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
  // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_BOTTOM,
      style: maps.ZoomControlStyle.SMALL
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl: true
  };
}
export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverKey: ''
    };
    this._onBoundsChange = this._onBoundsChange.bind(this);
    this._onChildClick = this._onChildClick.bind(this);
    this._onChildMouseEnter = this._onChildMouseEnter.bind(this);
    this._onChildMouseLeave = this._onChildMouseLeave.bind(this);
    this._onChildMouseMove = this._onChildMouseMove.bind(this);
  }
  changeHoverKey(hoverKey) {
    this.setState({hoverKey});
  }
  _onBoundsChange(center, zoom, bounds, marginBounds) {

  };
  _onChildClick(key, childProps) {
    this.changeHoverKey(key);
  }

  _onChildMouseEnter(key, childProps) {
    this.changeHoverKey(key);
  }

  _onChildMouseLeave(key, childProps) {
    this.changeHoverKey(null);
  }
  _onChildMouseMove(key, childProps) {
    console.log('_onChildMouseMove:');
    console.log('key:', key);
    console.log('childProps:', childProps);
  }

  render() {
    const places = this.props.greatPlaces
      .map(place => {
        const {id, ...coords} = place;
        return (
          <Maker
            key={id}
            {...coords}
            hover={this.state.hoverKey === id} />
        );
      });
    return (
      <div className="map-frame">
        <GoogleMap
          bootstrapURLKeys={{key: 'AIzaSyCqQ9YJ0YZX7_luhPCv3uBE_XURtUo3vLg'}}
          center={this.props.center}
          zoom={this.props.zoom}
          options={createMapOptions}
          onChange={this._onBoundsChange}
          onChildClick={this._onChildClick}
          onChildMouseEnter={this._onChildMouseEnter}
          onChildMouseLeave={this._onChildMouseLeave}
          onChildMouseMove={this._onChildMouseMove}
          hoverDistance={20}>
          {places}
        </GoogleMap>
      </div>
    );
  }
}
Map.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number,
  greatPlaceCoords: PropTypes.any
};
Map.defaultProps = {
  center: [59.938043, 30.337157],
  zoom: 9,
  greatPlaces: [
    {id: 'A', lat: 59.955413, lng: 30.337844},
    {id: 'B', lat: 59.724465, lng: 30.080121}
    ]
};