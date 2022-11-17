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

module.exports = connection