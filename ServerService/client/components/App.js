import React, {Component, PropTypes} from 'react';
import Map from './Maps/Map';
export default class App extends Component {
  render() {
    return (
      <div className="main-app">
        <div className="header">
          <h2 className="vertical-align-center">App định vị tọa độ khách</h2>
        </div>
        <div className="content">
          <div className="content-left">
            <Map/>
          </div>
          <div className="content-right">

          </div>
        </div>
        <div className="footer">
          <h3 className="vertical-align-center">Copyright 2017 - Authors: Nguyễn Thanh Nhàn, Trần Văn Trãi</h3>
        </div>
      </div>
    );
  }
}