require('dotenv').config();

//express is the framework we're going to use to handle requests
const express = require('express')

//Create a new instance of express
const app = express()

var http = require('http');
var mysql = require('mysql2');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);

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

const port = process.env.PORT || 5000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.get('/', (request, response) => {
    let testName = 'Shrek'

    response.status(200).send({
        'name': testName
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})