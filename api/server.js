
//server.js
// npm run start === Starts the server.
console.log("we're up and running");
require("dotenv").config();
const {interestsArray} = require('./interestData.js');
const express = require("express");
const path = require("path");
const server = express();
const jwt = require('jsonwebtoken');
const { hashSync, compareSync } = require('bcryptjs'); // bcrypt will encrypt passwords to be saved in db
const { port, secret } = require("../config/secrets.js");
const { addUser, findUsersBy, addUserProfile, findProfileInformation, findSearchedUsers } = require("./models/users.js"); 

// the __dirname is the current directory from where the script is running
server.use(express.static(__dirname));
server.use(express.static(path.join(__dirname, "../build")));

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});


server.use(express.json()); // use middleware to parse the request body to a JSON object so we can access the data.

server.post("/profile", authenticateToken, async (req, res, next) => {
  // Deconstruct emailAddr from user
  const {emailAddr} = res.locals.user;
  try {
    // Make a SQL request on the column 'email' with the value in the variable 'emailAddr'
  const usersProfileData = await findProfileInformation({email: emailAddr });
  // Json the object we get back.
    res.json({ usersProfileData });
  } catch (error) {
    console.log(error);
    next(error);
  }
}); 

// I believe there is a "header" error when the JWT expires. However the user doesn't log out?
server.post("/search", authenticateToken, async (req, res, next) => {
  const {selectedTags} = req.body;
  // Split the input to create an array.
  // const toArraySearchInput = mergedInput.split(" ");
  console.log(selectedTags);
    try {
        // loop through the interests and all special characters. This regex was found here 
  // https://stackoverflow.com/questions/4374822/remove-all-special-characters-with-regexp
  if(!selectedTags) {
    console.log('There was no interests selected');
  } else if(selectedTags) {
    const cleanArray = selectedTags.map( splitInterests =>  splitInterests.replace(/[^\w\s]/g, ''));
    // compare our interestData array to our cleanCommaString
    const comparedAndFilteredInterests = interestsArray.filter(element => cleanArray.includes(element));
    // check that our filtered search results has NO matching interests.
    if(comparedAndFilteredInterests.length <= 0) console.log('no search query matched');
        // Make a SQL request on the column 'interests' column.
        const matchedUsersData = await findSearchedUsers(comparedAndFilteredInterests);
        const matchedRows = matchedUsersData.rows;
        // Json the object we get back.
        res.json({ matchedRows });
  }
    } catch (error) {
        console.log(error);
        next(error);
    }
}); 

server.post(`/signup`, async (req, res, next) => {   // Listen to trafic on the /signup path from our Front-End serverlication
  let { email, password } = req.body; // store the request body to the newUser varliable.
  try { // try the code below and exectue if the req comes back good.
    if(password.length >= 8 && email.length >= 12 ) {
      const hashedPassword = await hashSync(password, 14);
      password = hashedPassword;
      const newUser = {
        email: email,
        password: password
      }
      await addUser(newUser);
      console.log('user has been created');
      res.sendStatus(201);
    } else {
      console.log('User was not created');
      res.sendStatus(401);
    }
  } catch (error) {    // if the code above fails in the try, run the code in the catch block.
    next('There was an error ' + error);
  }
});


server.post('/signup/add-profile', async (request, response, next) => {
let {email, interests} = request.body.profileObject;
let {firstName, lastName, tagLine, education, region, city, state} = request.body.profileObject.profileInformation;

const reconstructedUserProfileInformation = {
  email: email,
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
    await addUserProfile(reconstructedUserProfileInformation);
    console.log(request.body.profileObject);
    response.sendStatus(201);
  } catch(error) {
    next(error);
  }
})

server.post(`/login`,  async (req, res, next) => {
  let {email, password} = req.body;
  try {
    const user = await findUsersBy({ email }).first(); // Search database for first user with the email from the req body.
    const isCorrectPassword = await compareSync(password, user.password); // compare the req password with the returned user pass from db.
    if(email !== user.email || !isCorrectPassword)  { // check if we have the right email or password
      console.log('email or password was invalid.');
      res.sendStatus(401);
    } else if(email === undefined || password === undefined) { // check if the email or password are even in the database
      console.log('creds were bogus');
      res.sendStatus(401);
    } else if(email === user.email && isCorrectPassword) { // email and password match to a user in the database.
      // Create jwt token
      const token = generateToken(user);  
      // Server responds with the token in JSON format
      
      res.json({token})
      console.log('Success');

    }
  } catch (error) {
    next(error);
  }
})

function generateToken(user) {
  const payload = {
    emailAddr: user.email, // sub
  }
  const options = {
    expiresIn: '24h',
  }
  return jwt.sign(payload, secret, options);
}

// Middleware function
function authenticateToken(req, res, next) {
  // create a variable for the token from the clients request.
  const token = req.headers.authorization
  // if token is false, return a 401.
  if(!token) return res.status(422).send('Access Denied');

  try{
    // Verify the JWT that we have to the clients JWT
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // store the verified payload to the user object in the locals object.
    res.locals.user = verified;
    next();
  }catch (error) {
    jwt.destroy(token);
    res.status(401).json(error).send('Invalid Token');
  }
}

server.listen(port);
