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

    pool.query('SELECT MAX(MessageId) AS Id FROM Messages', function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {

            const messageId = results[0].Id + 1;
            const text = request.body.text; //request.text;
            //const country = request.country;
            //const sender = "null";
            //const recipient = "null";
            const messageLength = text.length;
            const theQuery = `INSERT INTO Messages(MessageId, Text, MessagePassword, MessageLength) VALUES(${messageId}, '${text}', replace(uuid(),'-',''), ${messageLength})`
            
            pool.query(theQuery, function(err, results, fields) {
                pool.query(`SELECT * FROM Messages WHERE MessageId = ${messageId}`, function(err, results, fields) {
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
                            messageId: 'Inserted Message, ID: ' + messageId,
                            password: 'With password :'+password
                        })
                    }
                });
                
            });
        }
    });
});

module.exports = router