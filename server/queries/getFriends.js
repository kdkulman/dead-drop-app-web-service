// const { response } = require('express')
// const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser');
const pool = require('../utilities/databaseConnection.js')
let router = express.Router();
router.use(bodyParser());


router.get("/", (request, response) => {

    pool.query(`SELECT Friend2 FROM Friends WHERE Friend1 = '${request.body.currUser}' AND InviteStatus = 1 GROUP BY Friend2 `, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log(`Friends of ${request.body.currUser} are shown`);
            console.log("Number of friends: " + results.length)
            let stringFriends = [];
            results.forEach(element => {
                console.log("This guy: " + element.Friend2);
                stringFriends.push(""+element.Friend2);
            });
            
            response.status(200).send({
                friendsList: stringFriends
            })
        }
    });
});

module.exports = router