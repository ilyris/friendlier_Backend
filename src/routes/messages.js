const { PORT } = require("../config")
var app = require("express")()
var router = app.Router()
const server = require("https").createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "https://hideir.netlify.app",
        methods: ["GET", "POST"]
    }
})

server.listen(8081, () => console.log(`Socket.io listening on ${8081}`))

// The event will be called when a client is connected.
io.on("connection", (socket) => {
    console.log("connection")
    socket.emit("hello", { data: "more data" })

    socket.on("disconnect", () => {
        console.log("user left")
    })
})

module.exports = router
