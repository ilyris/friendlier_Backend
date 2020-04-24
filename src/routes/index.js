const { Router } = require("express")
const jwt = require("jsonwebtoken")
const { hashSync, compareSync } = require("bcryptjs") // bcrypt will encrypt passwords to be saved in db
const { JWT_SECRET } = require("../config.js");

const {
    addUser,
    findUsersBy,
    addUserProfile,
    findProfileInformation,
    findSearchedUsers,
    addUserMessage,
    getMessages,
    getInterests
} = require("../models/users")
const { interestsArray } = require("../utils/interestData")

const router = Router()

router.get("/loggedInUser", authenticateToken, async (req, res, next) => {
    // Deconstruct emailAddr from user
    const { emailAddr, username } = res.locals.user;
    console.log(res.locals.user);
    // const {filter} = req.body
    try {
        // Make a SQL request on the column 'email/username' with the value in the variable 'emailAddr/username'
        const loggedInUserData = await findProfileInformation({
            email: emailAddr,
            username: username
        })
        // Json the object we get back.
        res.json({ loggedInUserData })
    } catch (error) {
        console.log(error)
        next(error)
    }
})
router.post("/profile/:id", authenticateToken, async (req, res, next) => {
    const { profileId } = req.body
    try {
        // Make a SQL request on the column 'email' with the value in the variable 'emailAddr'
        const usersProfileData = await findProfileInformation({ id: profileId }) // create a inner join to get profile data for a user based off ID
        // Json the object we get back.
        res.json({ usersProfileData })
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// I believe there is a "header" error when the JWT expires. However the user doesn't log out?
router.post("/search", authenticateToken, async (req, res, next) => {
    const { selectedTags } = req.body
    // Split the input to create an array.
    // const toArraySearchInput = mergedInput.split(" ");
    try {
        // loop through the interests and all special characters. This regex was found here
        // https://stackoverflow.com/questions/4374822/remove-all-special-characters-with-regexp
        if (!selectedTags) {
            console.log("There was no interests selected")
        } else if (selectedTags) {
            const cleanArray = selectedTags.map(splitInterests =>
                splitInterests.replace(/[^\w\s]/g, "")
            )
            // compare our interestData array to our cleanCommaString
            const comparedAndFilteredInterests = interestsArray.filter(element =>
                cleanArray.includes(element)
            )
            // check that our filtered search results has NO matching interests.
            if (comparedAndFilteredInterests.length <= 0) console.log("no search query matched")
            // Make a SQL request on the column 'interests' column.
            const matchedUsersData = await findSearchedUsers(comparedAndFilteredInterests)
            const matchedRows = matchedUsersData.rows
            // Json the object we get back.
            res.json({ matchedRows })
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.post(`/signup`, async (req, res, next) => {
    // Listen to trafic on the /signup path from our Front-End routerlication
    try {
        // try the code below and exectue if the req comes back good.
        let { username, email, password } = req.body // store the request body to the newUser varliable.
        console.log(username, email, password)
        if (password.length >= 8 && email.length >= 12 && username.length >= 5) {
            const hashedPassword = await hashSync(password, 14)
            password = hashedPassword
            const newUser = {
                email: email,
                password: password,
                username: username
            }
            await addUser(newUser)
            console.log("user has been created")
            res.sendStatus(201)
        } else { 
            console.log("User was not created")
            res.sendStatus(401)
        }
    } catch (error) {
        // if the code above fails in the try, run the code in the catch block.
        next("There was an error " + error)
    }
})
router.get("/signup/interests", async (request, response, next) => {
    try{
        console.log('tried to grab interests');
        const interests = await getInterests();
        console.log(interests);
        response.json({ interests })
    }catch(error) {
        next(error);
    }
})
router.post("/signup/add-profile", async (request, response, next) => {
    console.log(request.body.profileObject);
    let { username, email, interests } = request.body.profileObject
    let {
        firstName,
        lastName,
        tagLine,
        education,
        region,
        city,
        state
    } = request.body.profileObject.profileInformation

    const reconstructedUserProfileInformation = {
        email: email,
        username: username,
        interests: interests,
        firstName: firstName,
        lastName: lastName,
        tagLine: tagLine,
        education: education,
        region: region,
        city: city,
        state: state
    }
    try {
        await addUserProfile(reconstructedUserProfileInformation)
        response.sendStatus(201)
    } catch (error) {
        next(error)
    }
})

router.post("/send-message", async (request, response, next) => {
    const { senderId, receiverId, message, sentAt } = request.body
    const reconstructedMessage = {
        senderId,
        receiverId,
        message,
        sentAt
    }
    try {
        await addUserMessage(reconstructedMessage)
        response.sendStatus(201)
    } catch (error) {
        next(error)
    }
})

router.get("/profile/:id/messages", authenticateToken, async (request, response, next) => {
    console.log("profile id messages route")
    const loggedInUserId = request.params.id
    const receiverUserId = request.body.receiveingUserId
    try {
        const messages = await getMessages(loggedInUserId, receiverUserId)
        console.log(messages)
        response.json({ messages })
    } catch (error) {
        next(error)
    }
})

router.post(`/signin`, async (req, res, next) => {
    let { username, password } = req.body;
    try {
        let user;
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username)) {
            // check that it matches email
            user = await findUsersBy({ email: username }).first();
        } else if(/^\S*$/.test(username)) {
            // check that it then matches a username with no spaces if its not an email address
            console.log('this was an username')
            user = await findUsersBy({ username }).first();
        } else if(/^\S*$/.test(username) === false) {
            res.sendStatus(401)
            console.log('Invalid Username');
        } else if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username) === false) {
            console.log('invalid Email Address');
            res.sendStatus(401);
        }
        const isCorrectPassword = await compareSync(password, user.password) // compare the req password with the returned user pass from db.

        if(username == false || username === undefined || !isCorrectPassword) {
                console.log("username or password was invalid.")
                res.sendStatus(401)
        } else if ((username === user.username && isCorrectPassword) || (username === user.email && isCorrectPassword)) {
            // Create jwt token
            const token = generateToken(user)
            res.json({ token })
            console.log("Singed In")
        }
    } catch (error) {
        next(error)
    }
})

router.get("/", (req, res) => {
    res.json({ interestsArray })
})

function generateToken(user) {
    const payload = {
        emailAddr: user.email, // sub
        username: user.username
    }
    const options = {
        expiresIn: "24h"
    }
    console.log(JWT_SECRET);
    return jwt.sign(payload, JWT_SECRET, options)
}

// Middleware function
function authenticateToken(req, res, next) {
    // create a variable for the token from the clients request.
    const token = req.headers.authorization;

    // if token is false, return a 401.
    if (!token) return res.status(422).send("Access Denied")
    try {
        // Verify the JWT that we have to the clients JWT
        const verified = jwt.verify(token, JWT_SECRET)

        // store the verified payload to the user object in the locals object.
        res.locals.user = verified
        next()
    } catch (error) {
        res.status(401)
            .json(error)
            .send("Invalid Token")
    }
}

module.exports = router
