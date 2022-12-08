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

    const sender = request.body.sender;
    const receiver = request.body.receiver;

    let theQuery = 
    `INSERT INTO Friends(Friend1, Friend2) 
    VALUES('${sender}', '${receiver}')`
    pool.query(theQuery, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            const message = `${sender} and ${receiver} are now friends`;
            response.header("Access-Control-Allow-Origin", "*");
            response.status(200).send({
                friends: message
            })
        }
    });
});

module.exports = router