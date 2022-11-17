require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
const mysql = require('mysql2');

let connection = mysql.createConnection({
  //connectionLimit : 10,
  //host: process.env.DB_HOST_LOG,
  user: 'be9fd6bb4c1e22',
  password: 'fc63b477',
  host: 'us-cdbr-east-06.cleardb.net',
  database: 'heroku_eba719e0a8ff324'
  //port:process.env.DB_PORT
})

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

//You can use this to check if your server is working
app.get('/', (req, res)=>{
  res.send({ gender : 'kevin'})
})

app.use('/', require('./queries/storeMessage.js'))

app.listen(port, () => {
  console.log("Server up and running on port: " + (port));
});

module.exports = connection