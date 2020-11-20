// ************* This is the main server file  ***********
const express = require("express")
const http = require('http')
const cors = require("cors")
const { PORT } = require("./config")
const apiRouter = require("./routes")
const socketio = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(cors())
app.use(express.json()) // use middleware to parse the request body to a JSON object so we can access the data.
// Run when a client connects
app.use("/", apiRouter) // TRhis can be split into a ton of sub-routes
io.on("connection", (socket) => {
    console.log("connect")

    socket.emit('message', 'Welcome To the chat')
    socket.broadcast.emit()
})
app.listen(PORT, () => {
    console.log(`Hideir REST API listening @ http://localhost:${PORT}`)
})
