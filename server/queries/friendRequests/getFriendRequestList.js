// const { response } = require('express')
// const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser');
const pool = require('../../utilities/databaseConnection.js')
let router = express.Router();
router.use(bodyParser());


router.get("/", (request, response) => {

    let theQuery = `select RequestSender FROM FriendRequests 
    WHERE RequestReceiver = '${request.body.currUser}'`

    pool.query(theQuery, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log(`Friends of ${request.body.currUser} are shown`);
            console.log("Number of friends: " + results.length)
            let stringRequests = [];
            results.forEach(element => {
                console.log("This guy: " + element.RequestSender);
                stringRequests.push(""+element.RequestSender);
            });
            
            response.status(200).send({
                friendRequestsList: stringRequests
            })
        }
    });
});

module.exports = router