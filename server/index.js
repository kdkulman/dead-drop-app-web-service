require('dotenv').config();
const bodyParser = require('body-parser');

const express = require('express')
const app = express()
const cors = require('cors')
const port = 5001//process.env.PORT || 5555

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

app.listen(port, () => {
  console.log("Server up and running on port: " + (port));
});