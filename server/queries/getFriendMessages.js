// const { response } = require('express')
// const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser');
const pool = require('../utilities/databaseConnection.js')
let router = express.Router();
router.use(bodyParser());



router.get("/", (request, response) => {

    let theQuery = 
    `Select MP.Sender Send, Text
    From messagecontents MC
    JOIN messageparticipants MP 
    ON MC.MessageId = MP.MessageId
    where MP.Recipient = '${request.body.currUser}'
    AND MP.Sender IN 
        (select Friend1 AS FriendList 
        FROM Friends
        WHERE Friend2 = '${request.body.currUser}'
        UNION
        select Friend2
        from Friends
        where Friend1 = '${request.body.currUser}')`
    

    pool.query(theQuery, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log(`Messages from friends of ${request.body.currUser} are shown`);
            console.log("Number of friends: " + results.length)
            let stringFriendsMessages = [];
            results.forEach(element => {
                console.log("This guy: " + element.Send);
                stringFriendsMessages.push([element.Send, element.Text]);
            });
            
            response.status(200).send({
                friendsList: stringFriendsMessages
            })
        }
    });
});


module.exports = router