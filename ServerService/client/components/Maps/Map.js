import React, {Component, PropTypes} from 'react';
import GoogleMap from 'google-map-react';
import Maker from './Maker.js';
import SearchBox from './SearchBox.js';
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
    mapTypeControl: true,

  };
}
export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverKey: '',
      bounds: null,
      nearCarPlaces: [
        {id: 'A', lat: 59.955413, lng: 30.337844},
        {id: 'B', lat: 59.724465, lng: 30.080121}
      ],
      yourPlace: {id: 'Your', lat: 59.70990117354236, lng: 30.672240007812434}
    };
    this._onBoundsChange = this._onBoundsChange.bind(this);
    this._onChildClick = this._onChildClick.bind(this);
    this._onChildMouseEnter = this._onChildMouseEnter.bind(this);
    this._onChildMouseLeave = this._onChildMouseLeave.bind(this);
    this._onChildMouseMove = this._onChildMouseMove.bind(this);
    this.mapOnClick = this.mapOnClick.bind(this);
  }
  changeHoverKey(hoverKey) {
    this.setState({hoverKey});
  }
  _onBoundsChange(center, zoom, bounds, marginBounds) {
    this.setState({bounds});
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
  _onChildMouseMove(key, childProps, newLocation) {
    console.log('_onChildMouseMove:');
    console.log('key:', key);
    console.log('childProps:', childProps);
    console.log('newLocation:', newLocation);
  }
  mapOnClick(location) {
    console.log('on map click');
    console.log(location);
    let {lat, lng} = location;
    let yourPlace = this.state.yourPlace;
    yourPlace.lat = lat;
    yourPlace.lng = lng;
    this.setState({yourPlace});
  }

  render() {
    const places = this.state.nearCarPlaces
      .map(place => {
        const {id, ...coords} = place;
        return (
          <Maker
            key={id}
            {...coords}
            hover={this.state.hoverKey === id} />
        );
      });
    const {yourPlaceID, ...yourCoords} = this.state.yourPlace;
    const yourPlace =
      <Maker
        key={yourPlaceID}
        {...yourCoords}
        hover={this.state.hoverKey === yourPlaceID} />;
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
          hoverDistance={20}
          draggable={true}
          onClick={this.mapOnClick}
        >
          <SearchBox ref="searchBox"
            bounds={this.state.bounds}/>
          {places}
          {yourPlace}
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
  zoom: 9
};