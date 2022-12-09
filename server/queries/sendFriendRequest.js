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
    const theQuery = `SELECT Username FROM USERS WHERE Username = '${receiver}'`;

    pool.query(theQuery, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            if(results[0] == undefined) {
                response.status(200).send({
                    status: 'Request failed. Target user does not exist',
                    success: false
                })
            } else {
                const theQuery2 = `INSERT INTO friendrequests(RequestSender, RequestReceiver) VALUES ('${sender}', '${receiver}')`;
                pool.query(theQuery2, function(err, results, fields) {
                    if(err) {
                        console.log(err);
                    } else {
                        response.header("Access-Control-Allow-Origin", "*");
                        response.status(200).send({
                        status: 'Request sent from ' + sender + ' to ' + receiver + '!',
                        success: true
                        })
                    }
                })

            }
            
        }
    });
});

module.exports = router