//listing all the requirements
const express = require('express')
const morgan = require('morgan')

const SerialPort = require('serialport')
const myPort = new SerialPort('/dev/cu.usbmodem1411', 9600)

var currentPattern; 

//serialport stuff ends here

//express stuff starts here
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.use(morgan('hello simon and keerthana'))
//this declares that morgan will be the environment we will use
//so every time a client sends a request to this server it will need to be through app.dev(morgan) first

//POST requests

app.post('/api/nothing', (req, res) => {
  var response = 'nothing displayed';
  myPort.write('0'); //all serial functions in context of myPort object
  console.log('changing pattern to nothing');
  res.json([response]);
  currentPattern=0;
})


app.post('/api/rainbow', (req, res) => {
  var response = 'displaying rainbow pattern';
  myPort.write('1'); //all serial functions in context of myPort object
  console.log('changing pattern to rainbow');
  res.json([response]);
  currentPattern=1;
})

app.post('/api/fire', (req, res) => {
  var response = 'diaplaying fire pattern';
  myPort.write('2'); //all serial functions in context of myPort object
  console.log('changing pattern to fire');
  res.json([response]);
  currentPattern=2;
})

app.post('/api/strobe', (req, res) => {
  var response = 'displaying strobe light';
  myPort.write('3'); //all serial functions in context of myPort object
  console.log('changing pattern to strobe light');
  res.json([response]);
  currentPattern=3;
})

//GET REQUESTS

app.get("/color", (req, res) =>{
  var colorR = {name: "fire"}
  var colorG = {name: "rainbow"}
  var colorB = {name: "strobe"}
  console.log('getting colors');
  res.json([colorR, colorG, colorB])
})

app.get("/pattern", (req, res) => {
  if (currentPattern==0) {
    res.json(['current pattern is rainbow'])
  }
  else if (currentPattern==1) {
    res.json(['current pattern is fire'])
  }  
  else if (currentPattern==2) {
    res.json(['current pattern is strobe'])
  }
  res.json([currentPattern]);

})

app.get("/color", (req, res) => {

  var color1 = {r: 'req.create_red', g: "25", b:"100"}
  res.json([color1])
  //res.send("Nodemon auto updates when I save this file")
})

app.get("/speed", (req, res) => {
  var speed = Number
  res.json([speed])
  //res.send("Nodemon auto updates when I save this file")
})


app.listen(3003, () =>{
  console.log("Server is up and listening on 3003...")
})


function showPortOpen() {
   console.log('port open. Data rate: ' + myPort.baudRate);
}
 
function readSerialData(data) {
   console.log(data);
}
 
function showPortClose() {
   console.log('port closed.');
}
 
function showError(error) {
   console.log('Serial port error: ' + error);
}
