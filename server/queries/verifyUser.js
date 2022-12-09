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

    const userName = request.body.username;
    const passWord = request.body.password;
    const theQuery = `SELECT Username FROM USERS WHERE Username = '${userName}' AND Password = '${passWord}'`;

    pool.query(theQuery, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            response.header("Access-Control-Allow-Origin", "*");
            if(results[0] == undefined) {
                response.status(200).send({
                    userName: 'Username or password incorrect!',
                    success : false
                })
            } else {
                response.status(200).send({
                    userName: 'User ' + results[0].Username + ' found!',
                    success : true
                })
            }
        }
    });
});

module.exports = router