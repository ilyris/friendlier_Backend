const { Router } = require("express")
const router = Router()
const server = require("https").createServer(router)

// const jwt = require("jsonwebtoken")
// const { hashSync, compareSync } = require("bcryptjs") // bcrypt will encrypt passwords to be saved in db
// const { JWT_SECRET } = require("../config.js")

const io = (module.exports.io = require("socket.io")(server, {
    cors: {
        origin: "https://hideir.netlify.app",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: false
    }
}))

const SocketManager = require("./SocketManager")

io.on("connection", SocketManager)

module.exports = router