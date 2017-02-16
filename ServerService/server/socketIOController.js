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
      socket.on('connect', (user) => {
        console.log('Client connect, user: ', user);
        let userID = user.id;
        socketIDs[userID] = socket.id;
        socket.userID = userID;
      });
      socket.on('message', (message) => {
        console.log('Client send message: ', message);
        // let userReceive = message.userReceive;
        // Emit to all user connected, exclude current user
        socket.broadcast.emit('message', 'Hello world!');
        //io.to(socketID).emit('message', data);
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
