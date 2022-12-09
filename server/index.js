require('dotenv').config();
const bodyParser = require('body-parser');

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5001

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

app.use(bodyParser());

app.use(cors())

app.get('/', (req, res)=>{
  res.send({ gender : 'male'})
})

app.use('/storeMessage', require('./queries/storeMessage.js'));
app.use('/deleteMessage', require('./queries/deleteMessage.js'));
app.use('/getMessage', require('./queries/getMessage.js'));
app.use('/storeUser', require('./queries/createUser.js'));
app.use('/getFriends', require('./queries/getFriendsList.js'));
app.use('/getFriendRequests', require('./queries/getFriendRequests.js'));
app.use('/searchUsers', require('./queries/searchUsers.js'));
app.use('/getFriendMessages', require('./queries/getFriendMessages.js'));
app.use('/deleteFriendRequest', require('./queries/deleteFriendRequest.js'));
app.use('/acceptFriendRequest', require('./queries/acceptFriendRequest.js'));
app.use('/verifyUser', require('./queries/verifyUser.js'));
app.use('/sendFriendRequest', require('./queries/sendFriendRequest.js'));
app.use('/getMostActiveUser', require('./queries/getMostActiveUser.js'));


app.listen(port, () => {
  console.log("Server up and running on port: " + (port));
});