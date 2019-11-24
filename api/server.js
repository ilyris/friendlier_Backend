//server.js
// npm run start === Starts the server.
require("dotenv").config();
const express = require("express");
const path = require("path");
const server = express();
const { hashSync, compareSync } = require('bcryptjs'); // bcrypt will encrypt passwords to be saved in db
const {Unauthorized, InternalServerError} = require("http-errors");
const { port } = require("../config/secrets.js");
const { addUser, findUsersBy } = require("./models/users.js");

// the __dirname is the current directory from where the script is running
server.use(express.static(__dirname));
server.use(express.static(path.join(__dirname, "../build")));

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

server.get("/todo", async (req, res) => {
  try {
    const todos = await db("todo"); // making a query to get all todos
    res.json({ todos });
  } catch (error) {
    console.log(error);
  }
});

server.use(express.json()); // use middleware to parse the request body to a JSON object so we can access the data.

server.post(`/signup`, async (req, res, next) => {   // Listen to trafic on the /signup path from our Front-End serverlication
  let { email, password } = req.body; // store the request body to the newUser varliable.
  const hashedPassword = await hashSync(password, 14);
  password = hashedPassword;
  const newUser = {
    email: email,
    password: password
  }
  try { // try the code below and exectue if the req comes back good.
    await addUser(newUser);
    res.sendStatus(201);
  } catch (error) {    // if the code above fails in the try, run the code in the catch block.
    next(error);
  }
});

server.post(`/login`,  async (req, res, next) => {
  let {email, password} = req.body;

  try {
    const user =  await findUsersBy({ email }).first(); // Search database for first user with the email from the req body.
    const error401 = Unauthorized('Incorrect credentials');
    const isCorrectPassword = await compareSync(password, user.password); // compare the req password with the returned user pass from db.
    // const userId = user.id;
    // res.json({
    //   userId,
    //   isDefaultPassword
    // });

    if(email !== user.email || !isCorrectPassword)  { // check if we have the right email or password
      console.log('email or password was invalid.');
      res.sendStatus(401);
    } else if(email === undefined || password === undefined) { // check if the email or password are even in the database
      console.log('creds were bogus');
      res.sendStatus(401);
    } else if(email === user.email && isCorrectPassword) { // email and password match to a user in the database.
      console.log('Lets go!');
      res.sendStatus(200);
    }


  } catch (error) {
    next(error);
  }
})

server.listen(port);
