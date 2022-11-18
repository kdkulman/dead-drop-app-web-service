// const { response } = require('express')
// const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser');
const pool = require('../utilities/databaseConnection.js')
let router = express.Router() 
router.use(bodyParser());

router.post("/", (request, response) => {

    pool.query('SELECT MAX(MessageId) AS Id FROM Messages', function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            const messageId = results[0].Id + 1;
            const text = request.body.text; //request.text;
            //const country = request.country;
            //const sender = "null";
            //const recipient = "null";
            //const messageLength = text.length;
            const theQuery = `INSERT INTO Messages(MessageId, Text, DateCreated, MessageLength) VALUES(${messageId}, '${text}', CURRENT_TIMESTAMP, ${messageLength})`
        
            pool.query(theQuery, function(err, results, fields) {
                if (err) {
                    console.log(err);
                    response.status(400).send({
                        message: err
                    })
                } else {
                    response.status(200).send({
                        message: 'Inserted Message, ID: ' + messageId + 'Your msg is: ' + text
                    })
                }
            });
        }
    });
});

module.exports = router