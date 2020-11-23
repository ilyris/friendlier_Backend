const { PORT } = require("../config")
var express = require("express")
var http = require("https")
var router = express.Router()
var socketio = require("socket.io")

var app = express()
var server = http.Server(app)
var websocket = socketio(server, {
    cors: {
        origin: "https://hideir.netlify.app",
        methods: ["GET", "POST"]
    }
})
server.listen(SOCKETPORT, () => console.log(`Socket.io listening on ${PORT}`))

// The event will be called when a client is connected.
websocket.on("connection", (socket) => {
    console.log("connection")
    socket.emit("hello", { data: "more data" })

    socket.on("disconnect", () => {
        console.log("user left")
    })
})

module.exports = router
