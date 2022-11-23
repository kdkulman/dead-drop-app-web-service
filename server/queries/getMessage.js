// const { response } = require('express')
// const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser');
const pool = require('../utilities/databaseConnection.js')
let router = express.Router() 
router.use(bodyParser());

router.get("/", (request, response) => {

    pool.query(`SELECT Text, MessageId FROM Messages WHERE MessagePassword = '${request.body.MessagePassword}' `, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log("Message text grabbed");
            const msgText = results[0].Text;
            response.status(200).send({
                tempText: 'Text: ' + msgText, //remove this for final
                messageId: 'Grabbed Message, from ID: ' + results[0].MessageId
            })
        }
    });
});

module.exports = router