// const { response } = require('express')
// const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser');
const pool = require('../utilities/databaseConnection.js')
let router = express.Router();
router.use(bodyParser());


router.post("/", (request, response) => { 
    let theQuery = 
    `Select Text
    From messagecontents MC
    WHERE MC.MessageId IN
            (SELECT MessageId
            FROM MessageParticipants
            WHERE Recipient = '${request.body.currUser}'

            AND
        
            SENDER = '${request.body.sender}'
            )`

    pool.query(theQuery, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log(`Messages from friends of ${request.body.currUser} are shown`);
            console.log("Number of friends: " + results.length)
            let stringFriendsMessages = [];
            results.forEach(element => {
                stringFriendsMessages.push(element.Text.valueOf());
            });
            response.status(200).send({
                friendsList: stringFriendsMessages
            })
        }
    });
});


module.exports = router