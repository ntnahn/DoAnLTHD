import React, {Component, PropTypes} from 'react';
import Map from './Maps/Map';
import callApi from '../util/apiCaller';
import ChatSocket from '../util/socketController';
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientInfo: null,
      requesting: false
    };

    this.loadClient = this.loadClient.bind(this);
    this.handleSendRequest = this.handleSendRequest.bind(this);
    this.handleSetUser = this.handleSetUser.bind(this);
  }

  loadClient() {
    callApi('client/get-client-to-handle', 'get').then(client => {
      console.log('client', client);
      this.setState({clientInfo: client});
    });
  }
  handleSendRequest() {
    if(this.driver) {
      // Disable to can not click after process finished
      // Waiting for response of "Tài xế"
      this.buttonSendRequest.disabled = 'true';
      this.chatSocket.emitDriverRequest({
        user: this.driver,
        client: this.state.clientInfo
      });
      this.setState({requesting: true});
    } else {
      alert('Vui lòng chọn xe');
    }
  }
  handleSetUser(user) {
    console.log('App set user select', user);
    this.driver = user;
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
            <Map address={address} clientInfo={this.state.clientInfo}
                 handleSetUser={this.handleSetUser}
            />
          </div>
          <div className="content-right">
            <button onClick={this.loadClient} type="button" className="button btn-nap-diem">Nạp điểm</button>
            <span className={address===''?'hidden':''}>Địa chỉ: {address}</span>
            <label className={address===''?'hidden':''}>Ghi chú:</label>
            <textarea
              rows={4}
              className={`note-area ${address===''?'hidden':''}`}
              value={note}
              disabled="true" />
            <button
              ref={node=>this.buttonSendRequest=node}
              onClick={this.handleSendRequest} type="button"
              className={`button btn-send-request ${this.state.requesting?'btn-disable':''}`}>
              Gửi yêu cầu</button>
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
  componentDidMount() {
    this.chatSocket = new ChatSocket();

    this.chatSocket.listenDriverResponse((data)=>{
      console.log('listenDriverResponse:', data);
      this.setState({requesting: false});
    })
  }
}