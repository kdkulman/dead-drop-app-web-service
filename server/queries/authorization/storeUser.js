// const { response } = require('express')
// const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser');
const pool = require('../../utilities/databaseConnection.js')
let router = express.Router() 
router.use(bodyParser());

router.post("/", (request, response) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    const userName = request.body.username;
    const passWord = request.body.password;
    const nickName = request.body.nickname;

    pool.query(`INSERT INTO USERS(Username, Password, Nickname) VALUES('${userName}', '${passWord}', '${nickName}')`, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            response.header("Access-Control-Allow-Origin", "*");
            response.status(200).send({
                userName: 'Created user, username: ' + userName,
            })
        }
    });
});

module.exports = router