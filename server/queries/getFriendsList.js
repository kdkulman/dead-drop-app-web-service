// const { response } = require('express')
// const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser');
const pool = require('../utilities/databaseConnection.js')
let router = express.Router();
router.use(bodyParser());



router.get("/", (request, response) => {
    let theQuery = `select Friend1 AS FriendList FROM Friends
        WHERE Friend2 = '${request.body.currUser}' 
        UNION
        select Friend2
        from Friends
        where Friend1 = '${request.body.currUser}'`
    pool.query(theQuery, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log(`Friends of ${request.body.currUser} are shown`);
            console.log("Number of friends: " + results.length)
            let stringFriends = [];
            results.forEach(element => {
                console.log("This guy: " + element.FriendList);
                stringFriends.push(""+element.FriendList);
            });
            
            response.status(200).send({
                friendsList: stringFriends
            })
        }
    });
});

module.exports = router