var express = require("express")
var https = require("https")
var router = express.Router()
var socketio = require("socket.io")

var app = express()
var server = https.Server(app)
var websocket = socketio(server, {
    cors: {
      origin: '*',
    }
  })
server.listen(8081, () => console.log("Socket.io listening on *:8081"))

// The event will be called when a client is connected.
websocket.on("connection", (socket) => {
    console.log("connection")
    socket.emit("hello", { data: "more data" })

    socket.on("disconnect", () => {
        console.log("user left")
    })
})

module.exports = router
