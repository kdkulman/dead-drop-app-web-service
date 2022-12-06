// const { response } = require('express')
// const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser');
const pool = require('../../utilities/databaseConnection.js')
let router = express.Router();
router.use(bodyParser());


router.get("/", (request, response) => {

    pool.query(`SELECT Username FROM Users WHERE Username LIKE '${request.body.searchName}%' `, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log(`Users with name that contain '${request.body.searchName}' are shown`);
            
            let stringUsers = [];
            results.forEach(element => {
                console.log("This guy: " + element.Username);
                stringUsers.push(""+element.Username);
            });
            
            response.status(200).send({
                users: stringUsers
            })
        }
    });
});

module.exports = router