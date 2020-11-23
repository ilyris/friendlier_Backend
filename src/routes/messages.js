var express = require("express")
var https = require("https")
var router = express.Router()
var socketio = require("socket.io")

var app = express()
var server = https.Server(app)
var websocket = socketio(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": "https://hideir.netlify.app", //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        }
        res.writeHead(200, headers)
        res.end()
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
