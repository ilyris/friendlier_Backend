// ************* This is the main server file  ***********
const express = require("express")
const cors = require("cors")
const { PORT } = require("./config")
const apiRouter = require("./routes")

const server = express()
const io = require("socket.io")(server)

server.use(cors())

server.use(express.json()) // use middleware to parse the request body to a JSON object so we can access the data.
server.use("/", apiRouter) // TRhis can be split into a ton of sub-routes
io.on("connection", (socket) => {
    console.log("connect")
})
server.listen(PORT, () => {
    console.log(`Hideir REST API listening @ http://localhost:${PORT}`)
})
