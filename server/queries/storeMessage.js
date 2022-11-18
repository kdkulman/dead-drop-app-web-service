// const { response } = require('express')
// const { request } = require('express')
const express = require('express')
const pool = require('../utilities/databaseConnection.js')
let router = express.Router() 

router.post("/", (request, response) => {

    //THIS IS NOT FINAL, AMEND!!!!!!! 
    //let messageId = results[0].Id + 1;
    const text = request.text; //request.text;
    const country = request.country;
    const dateCreated = "CURRENT_TIMESTAMP";
    const sender = "null";
    const recipient = "null";
    const messageLength = text.length;

    pool.query('SELECT MAX(MessageId) AS Id FROM Messages', function(err, results, fields) {
        if (err) {
            console.log(err);
            console.log("this activates");

        } else {
            let messageId = results[0].Id + 1;
            let theQuery = `INSERT INTO Messages(MessageId, Text, DateCreated, MessageLength) VALUES(${messageId}, '${text}', CURRENT_TIMESTAMP, ${messageLength})`
            //let values = [tempMessageId, 'testbanana', 10]
        
            pool.query(theQuery, function(err, results, fields) {
                if (err) {
                    console.log(err);
                    response.status(400).send({
                        message: err
                    })
                } else {
                    response.status(200).send({
                        message: 'Inserted Message, ID: ' + messageId 
                    })
                }
            });
        }
    });
});

module.exports = router