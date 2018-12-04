//listing all the requirements
const express = require('express');
const morgan = require('morgan');
var values = require('./values.json');
console.log(values);
console.log(values['pattern']);


const SerialPort = require('serialport');
const myPort = new SerialPort('/dev/cu.usbmodem1411', 9600);

var Readline = SerialPort.parsers.Readline; // make instance of Readline parser
var parser = new Readline(); // make a new parser to read ASCII lines
myPort.pipe(parser); // pipe the serial stream to the parser

myPort.on('open', showPortOpen);
parser.on('data', readSerialData);
myPort.on('close', showPortClose);
myPort.on('error', showError);

var currentPattern; 
var currentColor;

//serialport stuff ends here

//express stuff starts here
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('./public'));
app.use(morgan('hello simon and keerthana'));
//this declares that morgan will be the environment we will use
//so every time a client sends a request to this server it will need to be through app.dev(morgan) first

//POST requests

app.post('/api', (req, res) => {

  // values['pattern'] = req.body.pattern;
  // values['speed'] = req.body.speed;
  // values['color'] = req.body.color;


  
  var input = req.body;
  JSON.stringify(input);

  values['pattern'] = input.pattern;
  values['speed'] = input.speed;
  values['color'] = input.color;

  console.log("pattern is :"+input.pattern);
  console.log("speed is :"+input.speed);
  console.log("color is :"+input.color);

  
  myPort.write(input.pattern+','+input.speed+'&'+input.color+';'); 
  //all serial functions in context of myPort object

  console.log(req.body);
  res.send(req.body);
  //res.send(req.body['pattern']);
  // console.log(req.body.speed);
  // console.log(req.body.color);

  // currentPattern=req.body.pattern;
  // currentSpeed=req.body.speed;
  // currentColor=req.body.color;
})

//GET REQUESTS

app.get("/color", (req, res) =>{
  res.send("current color is :"+values['color']); 
})

app.get("/pattern", (req, res) => {
  res.send("current pattern is :"+values['pattern']); 
})

app.get("/speed", (req, res) => {
  res.send("current speed is :"+values['speed']); 
})


app.listen(3003, () =>{
  console.log("Server is up and listening on 3003...")
})


function showPortOpen() {
   console.log('port open. Data rate: ' + myPort.baudRate);
}
 
function readSerialData(data) {
   console.log(data);
   currentPattern = data;
}
 
function showPortClose() {
   console.log('port closed.');
}
 
function showError(error) {
   console.log('Serial port error: ' + error);
}
