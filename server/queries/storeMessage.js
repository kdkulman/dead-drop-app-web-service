// const { response } = require('express')
// const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser');
const pool = require('../utilities/databaseConnection.js')
let router = express.Router() 
router.use(bodyParser());

router.post("/", (request, response) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");


    //MessageId is created by grabbing largest ID
    pool.query('SELECT MAX(MessageId) AS Id FROM Messages', function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {

            const messageId = results[0].Id + 1;
            const text = request.body.text; 
            const messageLength = text.length;

            const theQuery1 = `INSERT INTO Messages(MessageId, MessagePassword, MessageLength) 
                                VALUES(${messageId},replace(uuid(),'-',''), ${messageLength})`

            const theQuery2 = `INSERT INTO MessageContents(MessageId, Text)
                                VALUES(${messageId}, '${text}');`;
                                
            const theQuery3 = `SELECT MessagePassword FROM Messages WHERE MessageId = ${messageId}`

            pool.query(theQuery1, function(err, results, fields) {
                pool.query(theQuery2, function(err, results, fields) {
                    pool.query(theQuery3, function(err, results, fields) {
                        if (err) {
                            console.log(err);
                            response.status(400).send({
                                message: err
                            })
                        } else {
                            const password = results[0].MessagePassword;
                            console.log('Message ID: ' + messageId)
                            console.log('Message Text: ' + text)

                            response.header("Access-Control-Allow-Origin", "*");
                            response.status(200).send({

                                url:'localhost:5000/'+`getMessage?MessageId=${messageId}&MessagePassword=${password}`
                            })
                        }
                    });
                });
                
            });
        }
    });
});

module.exports = router