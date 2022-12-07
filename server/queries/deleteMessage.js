// const { response } = require('express')
// const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser');
const pool = require('../utilities/databaseConnection.js')
let router = express.Router() 
router.use(bodyParser());

router.put("/", (request, response) => {

    pool.query(`UPDATE Messages SET text='' WHERE MessageId = ${request.body.id} `, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log("Message text deleted");
            response.status(200).send({
                messageId: 'Deleted Message text, ID: ' + request.body.id
            })
        }
    });
});

module.exports = router