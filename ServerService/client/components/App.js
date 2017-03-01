import React, {Component, PropTypes} from 'react';
import Map from './Maps/Map';
import callApi from '../util/apiCaller';
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientInfo: null
    };

    this.loadClient = this.loadClient.bind(this);
  }

  loadClient() {
    callApi('client/get-client-to-handle', 'get').then(client => {
      console.log('client', client);
      this.setState({clientInfo: client});
    });
  }
  render() {
    let address = this.state.clientInfo?this.state.clientInfo.address:'';
    let note = this.state.clientInfo?this.state.clientInfo.note:'';
    return (
      <div className="main-app">
        <div className="header">
          <div className="vertical-align-center">
            <h2>App định vị tọa độ khách</h2>
          </div>
        </div>
        <div className="content">
          <div className="content-left">
            <Map address={address}/>
          </div>
          <div className="content-right">
            <button onClick={this.loadClient} type="button" className="button btn-nap-diem">Nạp điểm</button>
            <span className={address===''?'hidden':''}>Địa chỉ: {address}</span>
            <label className={address===''?'hidden':''}>Ghi chú:</label>
            <textarea
              rows={4}
              className={`note-area ${address===''?'hidden':''}`}
              value={note}
              disabled="true"
            />
          </div>
        </div>
        <div className="footer">
          <div className="vertical-align-center">
            <h4>Nguyễn Thanh Nhàn, Trần Văn Trãi</h4>
          </div>
        </div>
      </div>
    );
  }
}