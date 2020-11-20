const { Router } = require("express")
const router = Router()
// const server = require("https").createServer(router)

// const jwt = require("jsonwebtoken")
// const { hashSync, compareSync } = require("bcryptjs") // bcrypt will encrypt passwords to be saved in db
// const { JWT_SECRET } = require("../config.js")


router.get('/messages', (req, res, next) => {
    console.log(req.app.locals.io) //io object
    const io = req.app.locals.io
    io.emit('my event', { my: 'data' }) //emit to everyone
    res.send("OK")
});

// io.on("connection", () => {
//     console.log('a user connected');
// })

module.exports = router