// ************* This is the main server file  ***********
const express = require("express")
const cors = require("cors")
const { PORT } = require("./config")
const apiRouter = require("./routes")

const server = express()
const httpServer = require('http').createServer(server)
const io = require('socket.io')(httpServer)

httpServer.use(cors())

httpServer.use(express.json()) // use middleware to parse the request body to a JSON object so we can access the data.
httpServer.use("/", apiRouter) // TRhis can be split into a ton of sub-routes
io.on('connection', socket => {
    console.log('connect');
  });
httpServer.listen(PORT, () => {
    console.log(`Hideir REST API listening @ http://localhost:${PORT}`)
})
