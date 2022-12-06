const express = require('express')
const bodyParser = require('body-parser');
const pool = require('../../utilities/databaseConnection.js')
let router = express.Router() 
router.use(bodyParser());

router.post("/", (request, response) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");

    pool.query('SELECT MAX(InvitationNumber) AS Id FROM FRIENDS', function(err, results, fields) {
        if (err) {
            console.log(err);
        } else {

            const inviteNum = results[0].Id + 1;
            const friend1 = request.body.friend1;
            const friend2 = request.body.friend2;
            const inviteStatus = 1;
            const theQuery = `INSERT INTO FRIENDS(Friend1, Friend2, InvitationNumber, InviteStatus, DateInviteSent, DateInviteAccepted) 
                                VALUES('${friend1}', '${friend2}', ${inviteNum}, ${inviteStatus}, CURRENT_TIMESTAMP, NULL )`
            
            pool.query(theQuery, function(err, results, fields) {
                if (err) {
                    console.log(err);
                    response.status(400).send({
                        message: err
                    })
                } else {
                    const theQuery2 = `INSERT INTO FRIENDS(Friend1, Friend2, InvitationNumber, InviteStatus, DateInviteSent, DateInviteAccepted) 
                                VALUES('${friend2}', '${friend1}', ${inviteNum}, ${inviteStatus}, CURRENT_TIMESTAMP, NULL )`
                    pool.query(theQuery2, function(err, results, fields) {
                        if(err) {
                            console.log(err);
                            response.status(400).send({
                                message: err
                            })
                        } else {
                            response.header("Access-Control-Allow-Origin", "*");
                            response.status(200).send({
                                inviteNum: 'Friend Request Sent, ID: ' + inviteNum,
                                friend2: 'To User :'+friend2
                            })
                        }
                    })
                    
                }
            });
        }
    });
});

module.exports = router