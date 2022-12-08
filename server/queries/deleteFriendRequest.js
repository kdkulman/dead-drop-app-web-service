// const { response } = require('express')
// const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser');
const pool = require('../utilities/databaseConnection.js')
let router = express.Router() 
router.use(bodyParser());

router.delete("/", (request, response) => {
    let theQuery = 
    `DELETE FROM FriendRequests 
    WHERE RequestReceiver = '${request.body.currUser}'  
    AND RequestSender = '${request.body.requestingUser}'`;
    pool.query(theQuery, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log("Friend request deleted");
            response.status(200).send({
                requestingUser: 'Deleted friend request from, ID: ' + request.body.requestingUser
            })
        }
    });
});

module.exports = router