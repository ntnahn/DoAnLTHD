import React, {Component, PropTypes} from 'react';
export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ''
    };
    
    this.yourMarker = null;
    this.driverLocations = [
      {lat: 10.767647398680138, lng: 106.67454242706299},
      {lat: 10.759173173901845, lng: 106.67752504348755},
      {lat: 10.75740241027677, lng: 106.66718244552612},
      {lat: 10.763347075583702, lng: 106.6592001914978}
    ];
    this.driverMarkers = [];

    this.handleGeocode = this.handleGeocode.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }
  componentWillReceiveProps(props) {
    if(props.address&&props.address!=='') {
      Promise.resolve(this.setState({address: props.address})).then(()=>{
        this.geocodeAddress();
      });
    }
  }
  render() {
    return (
      <div className="map-frame">
        <div className="map" ref={node=>this.mapElement=node}></div>
        <div className="floating-panel">
          <input
            className="textAddress"
            type="textbox"
            onChange={this.handleAddressChange}
            value={this.state.address}/>
          <input
            className="button"
            type="button"
            value="Geocode"
            onClick={this.handleGeocode}/>
        </div>
      </div>
    );
  }
  handleGeocode() {
    this.geocodeAddress();
  }
  handleAddressChange(event) {
    this.setState({address: event.target.value});
  }
  componentDidMount() {
    window.onload = () => {
      this.map = new google.maps.Map(this.mapElement, {
        zoom: 12,
        center: {lat: 10.769284917844956, lng: 106.6663775333709},
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.LEFT_BOTTOM
        },
      });
      this.geocoder = new google.maps.Geocoder();

      this.map.addListener('click', (event)=>{
        this.replaceYourMarker(event.latLng);
        let lat = event.latLng.lat();
        let lng = event.latLng.lng();
        this.reverseGeocodeLatLng(lat, lng);
        console.log('location: ');
        console.log(`{lat: ${lat}, lng: ${lng}}`);
      });

      this.loadDriverMarkers();
    };
  }
  replaceYourMarker(location) {
    // Nếu đã geocode rồi thì mới có cái để replace
    if(this.yourMarker) {
      this.removeMarker(this.yourMarker);
      this.yourMarker = new google.maps.Marker({
        position: location,
        map: this.map,
        draggable: true
      });
      this.addMarkerDragEvent(this.yourMarker);
    }
  }
  geocodeAddress() {
    let address = this.state.address;
    this.geocoder.geocode({'address': address}, (results, status)=>{
      if (status === 'OK') {
        this.map.setCenter(results[0].geometry.location);
        console.log('results[0].geometry.location', results[0].geometry.location);
        Promise.resolve(this.removeMarker(this.yourMarker)).then(()=>{
          this.yourMarker = new google.maps.Marker({
            map: this.map,
            position: results[0].geometry.location,
            draggable: true
          });
          this.addMarkerDragEvent(this.yourMarker);
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  removeMarker(marker) {
    if(marker) {
      marker.setMap(null);
    }
  }
  addMarkerDragEvent(marker){
    google.maps.event.addListener(marker, 'dragend', (e)=>{
      let lat = e.latLng.lat();
      let lng = e.latLng.lng();
      // console.log('location: ', {lat, lng});
      this.reverseGeocodeLatLng(lat, lng);
    });
    // google.maps.event.addListener(marker, 'drag', (e)=>{
    //   let lat = e.latLng.lat();
    //   let lng = e.latLng.lng();
    //   console.log('location: ', {lat, lng});
    // });
  }
  reverseGeocodeLatLng(lat, lng) {
    var latlng = {lat, lng};
    this.geocoder.geocode({'location': latlng}, (results, status)=>{
      if (status === 'OK') {
        if (results[1]) {
          let address = results[1].formatted_address;
          this.setState({address});
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  /**
   * Location: {lat: 10.766688427994012, lng: 106.68370485305786}
   * @param location
   */
  addDriverMarker(location) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon:'images/bike_location_icon40x40.png'
    });
    marker.addListener('click', function() {
      console.log('Driver marker click');
      // todo: Lấy thông tin của marker(tài khoản của tài xế)
      // Sau khi chọn tài xế, nhấn nút gửi yêu cầu để
      // => Send the socket request to App tài xế
      // infowindow.open(map, marker);
    });
    this.driverMarkers.push(marker);
  }

  // Tải marker từ địa điểm của các xe ở gần
  loadDriverMarkers() {
    this.driverLocations.map((location)=>{
      this.addDriverMarker(location);
    });
  }

  // Sets the map on all markers in the array.
  setMapForDriverMarker(map) {
    this.driverLocations.map((marker)=>{
      marker.setMap(map);
    });
  }

  // Removes the markers from the map, but keeps them in the array.
  clearDriverMarkers() {
    this.setMapForDriverMarker(null);
  }

  // Shows any markers currently in the array.
  showDriverMarkers() {
    this.setMapForDriverMarker(map);
  }

  // Deletes all markers in the array by removing references to them.
  deleteDriverMarkers() {
    this.clearDriverMarkers();
    this.driverMarkers = [];
  }
}
Map.propTypes = {
  address: PropTypes.string,
};

/**
 * Random location in HCMC
 *
 **/