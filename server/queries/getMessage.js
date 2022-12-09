// const { response } = require('express')
// const { request } = require('express')
const express = require('express')
const bodyParser = require('body-parser');
const pool = require('../utilities/databaseConnection.js')
let router = express.Router() 
router.use(bodyParser());




router.get("/", (request, response) => {


    const theQuery = `SELECT Text 
    FROM MessageContents
    WHERE MessageContents.MessageId =(
        SELECT MessageId
        FROM Messages
        WHERE MessageId = '${request.query.MessageId}'  
    ) `
    //get params from request
    pool.query(theQuery, function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log("Message text grabbed");
            const msgText = results[0];
            response.status(200).send({
                text: msgText
            })
        }
    });
});

module.exports = router