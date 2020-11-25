const express = require("express")
const socketIO = require("socket.io")
const http = require("https")

let app = express()
let router = express.Router()
let server = http.createServer(app)

// The event will be called when a client is connected.
let io = socketIO(server, {
    cors: {
        origin: ["http://localhost:3000", "https://hideir.netlify.app"],
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})

io.on("connection", (socket) => {
    console.log("connection")
    socket.emit("hello", { data: "more data" })

    socket.on("disconnect", () => {
        console.log("user left")
    })
})

server.listen(80, () => console.log("Socket.io listening on *:80"))

module.exports = router
