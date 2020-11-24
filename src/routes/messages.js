// var express = require('express');
// var http = require('http');
// var router = express.Router();
// var socketio = require('socket.io');

// var app = express();
// var server = http.createServer(app);
// var websocket = socketio(server,   {
//     cors: {
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST"],
//       allowedHeaders: ["my-custom-header"],
//       credentials: true
//     }
//   });

// // The event will be called when a client is connected.
// websocket.on('connection', socket => {
//     console.log('connection');
//     socket.emit('hello', {data: 'more data'});

//     socket.on('disconnect', () => {
//         console.log('user left')
//     })
// })

// server.listen(8081, () => console.log('Socket.io listening on *:8081'));
// console.log("we're running?")
// module.exports = router;