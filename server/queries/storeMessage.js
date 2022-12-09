// const { response } = require('express')
// const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser');
const pool = require('../utilities/databaseConnection.js');
const { text } = require('body-parser');
let router = express.Router() 
router.use(bodyParser());

router.post("/", (request, response) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    //function to generate a 32 character uuid string
    const uuid = () => {
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    const verificationCode = uuid() + "";
    const theText = request.body.text;
    const sender = request.body.sender;
    const recipient = request.body.recipient;
    const country = request.body.country;
    const textLength = theText.length;

    if(sender == "") {
        const theQuery1 = `INSERT INTO MESSAGES (MessageId, MessageLength) VALUES ('${verificationCode}', ${textLength})`;
        pool.query(theQuery1, function(err, results, fields) {
            if(err) {
                console.log(err);
            } else {
                console.log("QUERY 1 success");

                const theQuery2 = `INSERT INTO messagecontents (MessageId, Text) VALUES ('${verificationCode}', '${theText}')`;
                pool.query(theQuery2, function(err, results, fields) {
                    if(err) {
                        console.log(err);
                    } else {
                        response.header("Access-Control-Allow-Origin", "*");
                        response.status(200).send({
                            url:'https://dead-drop-app-web-service.herokuapp.com/'+`getMessage?MessageId=${verificationCode}`
                        })
                    }  
                })
            }
        })

    } else {
        const theQuery3 = `INSERT INTO MESSAGES (MessageId, MessageLength) VALUES ('${verificationCode}', ${textLength})`;
        pool.query(theQuery3, function(err, results, fields) {
            if(err) {
                console.log("QUERY 3 FAILINING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                console.log(err);
            } else {
                const theQuery4 = `INSERT INTO messagecontents (MessageId, Text) VALUES ('${verificationCode}', '${theText}')`;
                pool.query(theQuery4, function(err, results, fields) {
                    if(err) {
                        console.log(err);
                    } else {
                        const theQuery5 = `INSERT INTO messageparticipants (MessageId, Sender, Recipient) VALUES ('${verificationCode}', '${sender}', '${recipient}')`;
                        pool.query(theQuery5, function(err, results, fields) {
                            if(err) {
                                console.log(err);
                            } else {
                                response.header("Access-Control-Allow-Origin", "*");
                                response.status(200).send({
                                    message: 'Success!',
                                })
                            }
                        })
                    }
                })
            }
        })

    }
});
module.exports = router;