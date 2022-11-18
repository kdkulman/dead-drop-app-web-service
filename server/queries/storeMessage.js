const { response } = require('express')
const { request } = require('express')
const express = require('express')
const pool = require('../utilities/databaseConnection.js')
let router = express.Router() 

router.post("/", (request, response) => {

    //THIS IS NOT FINAL, AMEND!!!!!!! 
    // const messageId = request.messageId;
    // const text = request.text;
    // const country = request.country;
    const dateCreated = "CURRENT_TIMESTAMP";
    const sender = "null";
    const recipient = "null";
    const messageLength = 4;
    const isRead = 0;
    const tempMessageId = 100;
    const tempText = 'banana';

    let theQuery = `INSERT INTO Messages(MessageId, Text, DateCreated, MessageLength) VALUES(104, 'HELLO JASHAN', CURRENT_TIMESTAMP, 12)`
    let values = [tempMessageId, 'testbanana', 10]

    pool.query(theQuery, function(err, results, fields) {
        if (err) {
            console.log(err);
            response.status(400).send({
                message: 'Message could not be inserted' 
            })
        } else {
            response.status(200).send({
                message: 'Inserted Message' 
            })
        }
    });

    // pool.promise().query(theQuery, values) 
    //     .then(result => {
    //         console.log("Inserted message");
    //         response.status(200).send({
    //             message: 'Inserted Message' 
    //         })
    //     })
        
        // .catch(error => {
        //     console.log(error);
        //     console.log("error, message could not be stored");
        //     response.status(401).send({
        //         message: 'Could not store message in database' 
        //     })
        // })
});

module.exports = router