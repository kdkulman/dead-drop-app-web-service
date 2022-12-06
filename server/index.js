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

//authorization
app.use('/storeUser', require('./queries/authorization/createUser.js'));

//messages
app.use('/storeMessage', require('./queries/messages/storeMessage.js'));
app.use('/deleteMessage', require('./queries/messages/deleteMessage.js'));
app.use('/getMessage', require('./queries/messages/getMessage.js'));

//friends
app.use('/getFriends', require('./queries/friends/getFriendList.js'));
app.use('/searchUsers', require('./queries/friends/searchUsers.js'));

//friend requests
app.use('/getFriendRequests', require('./queries/friendRequests/getFriendRequestList.js'));
app.use('/addFriend', require('./queries/friendRequests/acceptFriendRequest.js'));


app.listen(port, () => {
  console.log("Server up and running on port: " + (port));
});