/**
 * Created by THANHNHAN on 16/2/2017.
 */
var SocketIO = require('socket.io');

var socketIDs = {};
var io = {};
module.exports = class socketIOController {
  constructor(httpServer) {
    io = new SocketIO(httpServer);
  }
  beginListen() {
    console.log('Begin listen socketIO');
    // Using Socket.io Communication
    io.sockets.on('connection', (socket) => {
      console.log('Have new connection');
      socket.on('clientConnect', (userID) => {
        console.log('Client connect, userID: ', userID);
        socketIDs[userID] = socket.id;
        socket.userID = userID;
      });
      // Nếu có khách hàng yêu cầu được chở
      // Nhân viên định vị sẽ chọn 1 xe gần vị trí của khách và gửi yêu cầu
      socket.on('DriverRequest', (data)=>{
        // data bao gồm thông tin tài xế (user) và thông tin của khách đi xe (client)
        // Và id của Nhân viên định vị
        /**
         * data: {
         *    NvDvId: 'ergwegwfwegwe', // Id của Nhân viên định vị, để sau này bên app tài xế gửi kết quả về
         *    user: {...}, // tài xế
         *    client: {...} // khách đi xe
         * }
         */
        // Gửi yêu cầu tới tài xế
        // todo: kiểm tra tài xế có online hay ko
        // có thể chỉ load lên map các tài xế online
        console.log('DriverRequest:', data);
        let userID = data.user.id; // Mã của tài xế
        let client = data.client;
        let dataTransfer = {
          id: client.id,
          phone: client.phone,
          status: client.status,
          type: client.type,
          NvDvId: data.NvDvId
        };
        if(socketIDs[userID]) {
          io.to(socketIDs[userID]).emit('DriverRequest', dataTransfer);
        }
      });

      // Khi tài xế phản hồi yêu cầu của nhân viên định vị
      // Gửi về phản hồi đồng ý hay từ chối? 'accept' : 'decline'
      socket.on('DriverResponse', (data)=>{
        // data bao gồm thông tin user và thông tin của client
        /**
         *
         * data: {
         *    response: 'accept', // kết quả xác nhận của tài xế, accept || decline
         *    NvDvId: 'ergwegwfwegwe',
         *    user: {...}, // tài xế
         *    client: {...} // khách đi xe
         * }
         */
        // Gửi kết quả trả về cho App định vị
        console.log('DriverResponse:', data);
        let NvDvId = data.NvDvId; // Mã của App nhân viên định vị
        if(socketIDs[NvDvId]) {
          io.to(socketIDs[NvDvId]).emit('DriverResponse', data);
        }
      });

      socket.on('disconnect', () => {
        console.log('Client disconnect');
        // Remove user when disconnect
        let userID = socket.userID;
        delete socketIDs[userID];
      });
    });
  }
};
