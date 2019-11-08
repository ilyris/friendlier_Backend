//server.js
// npm run start === Starts the server.
require("dotenv").config();
const express = require("express");
const path = require("path");
const server = express();
const { hash } = require('bcrypt'); // bcrypt will encrypt passwords to be saved in db
const { port } = require("../config/secrets.js");
const { addUser } = require("./models/users.js");

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
  const hashedPassword = await hash(password, 10);
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

server.listen(port);
