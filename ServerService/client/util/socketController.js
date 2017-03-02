/**
 * Client Socket handle
 */
var cuid = require('cuid');
var io = require('socket.io-client');
export default class ChatSocket {
  constructor() {
    this.id = cuid(); // Random a id to identify
    this.connected = false;
    this.socket = io.connect();
    this.connectToServer();
  }
  connectToServer() {
    if(this.connected === false){
      console.log('Emit connectToServer');
      this.socket.emit('clientConnect', this.id);
      this.connected = true;
    }
  }
  disconnect() {
    if ( this.connected === true ) {
      this.id = null;
      this.connected = false;
      this.socket.disconnect();
    }
  }
  listenDriverResponse(callback) {
    this.socket.on('DriverResponse', (data) => {
      callback(data);
    });
  }
  emitDriverRequest(data) {
    data.NvDvId = this.id;
    this.socket.emit('DriverRequest', data);
  }
}