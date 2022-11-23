require('dotenv').config();
const bodyParser = require('body-parser');

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5555

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

app.use(bodyParser());
//You can use this to check if your server is working
app.get('/', (req, res)=>{
  res.send({ gender : 'male'})
})

app.post('/', (req, res)=>{
  const name = JSON.stringify(req.body);
  res.send("Your name is " + name);
})

app.use('/storeMessage', require('./queries/storeMessage.js'));
app.use('/deleteMessage', require('./queries/deleteMessage.js'));
app.use('/getMessage', require('./queries/getMessage.js'));

app.listen(port, () => {
  console.log("Server up and running on port: " + (port));
});