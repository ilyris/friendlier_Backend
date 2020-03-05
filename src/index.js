const express = require("express")
const cors = require("cors")

const { PORT } = require("./config")
const apiRouter = require("./routes")

const server = express()
server.use(cors())

server.use(express.json()) // use middleware to parse the request body to a JSON object so we can access the data.
server.use("/", apiRouter)

// Socket Connection via Socket.Io
// io.on("connection", socket => {
//   console.log("New client connected");
// })

server.listen(PORT, () => {
    console.log(`Hideir REST API listening @ http://localhost:${PORT}`)
})
