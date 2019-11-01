//server.js
// npm run start === Starts the server.

const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const db = require("../data/db.js"); // importing the db config
var pg = require('knex')({client: 'pg'});

app.use(favicon(__dirname + '../build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../build')));

app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/todo", async (req, res) => {
  try{
    const todos = await db("todo"); // making a query to get all todos
    res.json({ todos });  
  }
  catch (error) {
    console.log(error);
  }
})
app.post(`/signup`, (req, res) => {
  // const {email, pass} = req.body;
  // console.log;`${email} ${pass}`);
    // res.send(`POST to signup`);
    res.send('POSTED to /signup');
})

// knex('table').insert({a: 'b'}).returning('*').toString();
// // "insert into "table" ("a") values ('b')"

// pg('table').insert({a: 'b'}).returning('*').toString();
// // "insert into "table" ("a") values ('b') returning *"
app.listen(port); 