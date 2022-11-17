// const { response } = require('express')
// const { request } = require('express')
const express = require('express')
const connection = require('../utilities/databaseConnection.js').connection
let router = express.Router() //retrieve the router object from express

router.post("/", (request, response) => {
    console.log(request.body)
    //Retrieve data from query params\
    //THIS IS NOT FINAL, AMEND!!!!!!! 
    const messageId = request.messageId;
    const text = request.text;
    const country = request.country;
    const dateCreated = "CURRENT_TIMESTAMP";
    const sender = "null";
    const recipient = "null";
    const messageLength = 4;
    const isRead = 0;

    //We're using placeholders ($1, $2, $3) in the SQL query string to avoid SQL Injection
    //If you want to read more: https://stackoverflow.com/a/8265319
    let theQuery = `INSERT INTO Messages(MessageId, Text, DateCreated, MessageLength) VALUES(49966, test, CURRENT_TIMESTAMP, 4)`
    //let values = [messageId, text, dateCreated, messageLength]

    connection.query(theQuery, function (error, results, fields) {
        if (error) {
            response.status(401).send({
                message: 'Could not store message in database' 
            })
        } else {
            console.log("Inserted message");
            response.status(200).send({
                message: 'Inserted Message' 
            })
        }
    });
})

// "return" the router
module.exports = router