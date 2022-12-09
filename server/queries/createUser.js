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
    const nickname = request.body.nickname;
    let theQuery = 
    `INSERT INTO USERS(Username, Password, Nickname) 
    VALUES('${username}', '${password}', '${nickname}')`
    pool.query(theQuery, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            response.header("Access-Control-Allow-Origin", "*");
            response.status(200).send({
                username: username,
                nickname: nickname
            })
        }
    });
});

module.exports = router