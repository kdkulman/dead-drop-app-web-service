const { response } = require('express')
const { request } = require('express')
const express = require('express')
const pool = require('../utilities/databaseConnection.js')
let router = express.Router() 

router.post("/", (request, response) => {

    //THIS IS NOT FINAL, AMEND!!!!!!! 
    const text = 'banana';//request.text;
    // const country = request.country;
    const dateCreated = "CURRENT_TIMESTAMP";
    const sender = "null";
    const recipient = "null";
    const messageLength = text.length;
    const isRead = 0;
    const tempMessageId = 100;
    const tempText = 'banana';
    let messageId = 0;

    let idQuery = 'SELECT MAX(MessageId) AS Id FROM Messages'

    pool.query(idQuery, function(err, results, fields) {
        if (err) {
            console.log(err);
            console.log("this activates");

        } else {
            messageId = results[0].Id + 1;
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
                        message: 'Inserted Message' 
                    })
                }
            });
            console.log(results[0].Id); //print 666
        }
    });

    console.log(messageId + 1);



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