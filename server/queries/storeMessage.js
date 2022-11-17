//express is the framework we're going to use to handle requests
const express = require('express')
const connection = require('../index.js')

//retrieve the router object from express
var router = express.Router()




router.post("/", (request, response) => {
    //Retrieve data from query params\
    //THIS IS NOT FINAL, AMEND!!!!!!! 
    const messageId = request.body.messageId;
    const text = request.body.text;
    const country = request.body.country;
    const dateCreated = "CURRENT_TIMESTAMP";
    const sender = "null";
    const recipient = "null";
    const messageLength = text.length;
    const isRead = 0;




    
        
    //We're using placeholders ($1, $2, $3) in the SQL query string to avoid SQL Injection
    //If you want to read more: https://stackoverflow.com/a/8265319
    let theQuery = `INSERT INTO Messages(MessageId, Text, DateCreated, MessageLength) VALUES(49966, ${text}, CURRENT_TIMESTAMP, ${messageLength})`
    let values = [messageId, text, dateCreated, messageLength]
/*
    con.query("CREATE DATABASE mydb", function (err, result) {
        if (err) throw err;
        console.log("Database created");
      });
    });
*/
    connection.query(theQuery, values)
        .then(result => {
            //stash the memberid into the request object to be used in the next function
            response.status(200).send({
                message: 'It responded' 
            })
        })
        .catch((error) => {

            response.status(400).send({
                message: 'Could not store message in database' 
            })
        })
    
    response.send({
        message: "Hello, you sent a POST request"
    })
})
// "return" the router
module.exports = router