// ************* This is the main server file  ***********
const express = require("express")
// const http = require("http")
const cors = require("cors")
const { PORT } = require("./config")
const apiRouter = require("./routes")
const app = express()
// const server = http.createServer(app)
// const socketio = require("socket.io").listen(server)

const messagesRouter = require("./routes/messages")

app.use(cors())
app.use(express.json()) // use middleware to parse the request body to a JSON object so we can access the data.
app.use("/", apiRouter) // This can be split into a ton of sub-routes

// Socket IO connection on port 8081
app.use("/messages", messagesRouter)

app.listen(PORT, () => {
    console.log(`Hideir REST API listening @ http://localhost:${PORT}`)
})
