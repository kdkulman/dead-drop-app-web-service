require('../.env');

var http = require('http');
var mysql = require('mysql2');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);

let myHost = DB_HOST;
let myUser = DB_USERNAME;
let myPassword = DB_PASSWORD;
let connection = mysql.createConnection({
    host: myHost,
    user: myUser,
    password: myPassword
})