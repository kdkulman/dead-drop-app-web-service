// const { response } = require('express')
// const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser');
const pool = require('../utilities/databaseConnection.js')
let router = express.Router();
router.use(bodyParser());



router.post("/", (request, response) => {
    let theQuery = 
    `
    SELECT tem.ActiveFriend, COUNT(tem.ActiveFriend) AS msgAmount
    FROM (Select MP1.Sender AS ActiveFriend
    FROM messageparticipants MP1
    WHERE MP1.Sender IN (select Friend1 AS FriendList FROM Friends
        WHERE Friend2 = '${request.body.currUser}'
        UNION
        SELECT Friend2
        FROM Friends
        WHERE Friend1 = '${request.body.currUser}')
        
    UNION ALL

    Select MP2.Recipient
    FROM messageparticipants MP2 
    WHERE MP2.Recipient IN (select Friend1 AS FriendList 
        FROM Friends
        WHERE Friend2 = '${request.body.currUser}'
        UNION
        SELECT Friend2
        FROM Friends
        WHERE Friend1 = '${request.body.currUser}')) AS tem
        GROUP BY ActiveFriend
        ORDER BY msgAmount DESC
        `
    pool.query(theQuery, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log(`Most active friend of ${request.body.currUser} is shown`);
            let theFriend = results[0].ActiveFriend;
            
            response.status(200).send({
                mostActiveFriend: theFriend
            })
        }
    });
});

module.exports = router