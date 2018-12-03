//listing all the requirements
const express = require('express')
const morgan = require('morgan')

const SerialPort = require('serialport')
const myPort = new SerialPort('/dev/cu.usbmodem1411', 9600)

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
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.use(morgan('hello simon and keerthana'))
//this declares that morgan will be the environment we will use
//so every time a client sends a request to this server it will need to be through app.dev(morgan) first

//POST requests

app.post('/api', (req, res) => {
  myPort.write(req.body.pattern+','+req.body.speed+'&'+req.body.color+';'); //all serial functions in context of myPort object
  
  console.log(req.body);
  // console.log(req.body.speed);
  // console.log(req.body.color);

  // currentPattern=req.body.pattern;
  // currentSpeed=req.body.speed;
  // currentColor=req.body.color;
})

//GET REQUESTS

app.get("/color", (req, res) =>{
  if (currentColor==0) {
      res.json(['current color is set on blue']);    
  }
  else if (currentColor==1) {
      res.json(['current color is set on red']);    
  }
  else if (currentColor==2) {
      res.json(['current color is set on white']);    
  }
})

app.get("/pattern", (req, res) => {
  if (currentPattern==0) {
    res.json(['current pattern is nothing'])
  }
  else if (currentPattern==1) {
    res.json(['current pattern is rainbow'])
  }  
  else if (currentPattern==2) {
    res.json(['current pattern is fire'])
  }
  else if (currentPattern==3) {
    res.json(['current pattern is strobe'])
  }

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
   currentPattern = data;
}
 
function showPortClose() {
   console.log('port closed.');
}
 
function showError(error) {
   console.log('Serial port error: ' + error);
}
