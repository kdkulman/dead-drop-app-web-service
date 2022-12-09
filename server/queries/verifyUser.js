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

    const username = request.body.username;
    const password = request.body.password;
    const theQuery = `SELECT Username FROM USERS WHERE Username = '${username}' AND Password = '${password}'`;

    pool.query(theQuery, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            response.header("Access-Control-Allow-Origin", "*");
            if(results[0] == undefined) {
                response.status(200).send({
                    username: 'Username or password incorrect!',
                    success : false
                })
            } else {
                response.status(200).send({
                    username: results[0].Username,
                    nickname: results[0].Nickname
                })
            }
        }
    });
});

module.exports = router