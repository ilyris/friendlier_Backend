// ************* This is the main server file  ***********
const express = require("express")
const cors = require("cors")
// const whitelist = ["https://hideir.netlify.app"]
// const corsOptions = {
//     credentials: true,
//     origin: (origin, callback) => {
//         if (whitelist.includes(origin)) return callback(null, true)

//         callback(new Error("Not allowed by CORS"))
//     }
// }

const { PORT } = require("./config")
const apiRouter = require("./routes")
const messagesRouter = require("./routes/messages")

const server = express()

// server.use(cors(corsOptions))

server.use(express.json()) // use middleware to parse the request body to a JSON object so we can access the data.
server.use("/", apiRouter)
server.use(messagesRouter)
server.listen(PORT, () => {
    console.log(`Hideir REST API listening @ http://localhost:${PORT}`)
})
const io = require("socket.io").listen(server)
// io.listen(port)
server.locals.io = io
