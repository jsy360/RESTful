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

app.post('/api/nothing', (req, res) => {
  myPort.write('0'+','+'1'+'&'+'0'+';'); //all serial functions in context of myPort object
  console.log('no pattern');
  res.json(['no pattern']);
  currentPattern=0;
})

//RAINBOW

app.post('/api/rainbow', (req, res) => {
  myPort.write('1'+','+'1'+'&'+'0'+';'); //all serial functions in context of myPort object
  console.log('medium rainbow');
  res.json(['medium rainbow']);
  currentPattern=1;
})

app.post('/api/rainbow/speed=0', (req, res) => {
  myPort.write('1'+','+'0'+'&'+'0'+';'); //all serial functions in context of myPort object
  console.log('slow strobe');
  res.json(['slow strobe']);
  currentPattern=1;
})

app.post('/api/rainbow/speed=1', (req, res) => {
  myPort.write('1'+','+'1'+'&'+'0'+';'); //all serial functions in context of myPort object
  console.log('medium rainbow');
  res.json(['medium rainbow']);
  currentPattern=1;
})

app.post('/api/rainbow/speed=2', (req, res) => {
  myPort.write('1'+','+'2'+'&'+'0'+';'); //all serial functions in context of myPort object
  console.log('fast rainbow');
  res.json(['fast rainbow']);
  currentPattern=1;
})

//FIRE

app.post('/api/fire', (req, res) => {
  myPort.write('2'+','+'1'+'&'+'1'+';'); //all serial functions in context of myPort object
  console.log('normal speed red fire');
  res.json(['normal speed red fire']);
  currentPattern=2;
})

app.post('/api/fire/speed=0/color=0', (req, res) => {
  myPort.write('2'+','+'1'+'&'+'0'+';'); //all serial functions in context of myPort object
  console.log('slow blue fire');
  res.json(['slow blue fire']);
  currentPattern=2;
  currentColor=0;
})

app.post('/api/fire/speed=0/color=1', (req, res) => {
  myPort.write('2'+','+'1'+'&'+'0'+';'); //all serial functions in context of myPort object
  console.log('slow red fire');
  res.json(['slow red fire']);
  currentPattern=2;
  currentColor=1;
})

app.post('/api/fire/speed=0/color=2', (req, res) => {
  myPort.write('2'+','+'1'+'&'+'0'+';'); //all serial functions in context of myPort object
  console.log('slow white fire');
  res.json(['slow white fire']);
  currentPattern=2;
  currentColor=2;
})

app.post('/api/fire/speed=1/color=0', (req, res) => {
  myPort.write('2'+','+'1'+'&'+'0'+';'); //all serial functions in context of myPort object
  console.log('normal blue fire');
  res.json(['normal blue fire']);
  currentPattern=2;
  currentColor=0;
})

app.post('/api/fire/speed=1/color=1', (req, res) => {
  myPort.write('2'+','+'1'+'&'+'1'+';'); //all serial functions in context of myPort object
  console.log('normal red fire');
  res.json(['normal red fire']);
  currentPattern=2;
  currentColor=1;
})

app.post('/api/fire/speed=1/color=2', (req, res) => {
  myPort.write('2'+','+'1'+'&'+'2'+';'); //all serial functions in context of myPort object
  console.log('normal white fire');
  res.json(['normal white fire']);
  currentPattern=2;
  currentColor=2;
})


app.post('/api/fire/speed=2/color=0', (req, res) => {
  myPort.write('2'+','+'2'+'&'+'0'+';'); //all serial functions in context of myPort object
  console.log('fast blue fire');
  res.json(['fast blue fire']);
  currentPattern=2;
  currentColor=0;
})

app.post('/api/fire/speed=2/color=1', (req, res) => {
  myPort.write('2'+','+'2'+'&'+'0'+';'); //all serial functions in context of myPort object
  console.log('fast red fire');
  res.json(['fast red fire']);
  currentPattern=2;
  currentColor=1;
})

app.post('/api/fire/speed=2/color=2', (req, res) => {
  myPort.write('2'+','+'2'+'&'+'0'+';'); //all serial functions in context of myPort object
  console.log('fast white fire');
  res.json(['fast white fire']);
  currentPattern=2;
  currentColor=2;
})

//STROBE

app.post('/api/strobe', (req, res) => {
  myPort.write('3'+','+'1'+'&'+'2'+';'); //all serial functions in context of myPort object
  console.log('normal white strobe');
  res.json(['normal white strobe']);
  currentPattern=3;
})

app.post('/api/strobe/speed=0/color=0', (req, res) => {
  myPort.write('3'+','+'0'+'&'+'0'+';'); //all serial functions in context of myPort object
  console.log('slow blue strobe');
  res.json(['slow blue strobe']);
  currentPattern=3;
})

app.post('/api/strobe/speed=0/color=1', (req, res) => {
  myPort.write('3'+','+'0'+'&'+'1'+';'); //all serial functions in context of myPort object
  console.log('slow red strobe');
  res.json(['slow red strobe']);
  currentPattern=3;
  currentColor=1;
})

app.post('/api/strobe/speed=0/color=2', (req, res) => {
  myPort.write('3'+','+'0'+'&'+'2'+';'); //all serial functions in context of myPort object
  console.log('slow white strobe');
  res.json(['slow white strobe']);
  currentPattern=3;
  currentColor=2;
})

app.post('/api/strobe/speed=1/color=0', (req, res) => {
  myPort.write('3'+','+'1'+'&'+'0'+';'); //all serial functions in context of myPort object
  console.log('normal blue strobe');
  res.json(['normal blue strobe']);
  currentPattern=3;
})

app.post('/api/strobe/speed=1/color=1', (req, res) => {
  myPort.write('3'+','+'1'+'&'+'1'+';'); //all serial functions in context of myPort object
  console.log('normal red strobe');
  res.json(['normal red strobe']);
  currentPattern=3;
  currentColor=1;
})

app.post('/api/strobe/speed=1/color=2', (req, res) => {
  myPort.write('3'+','+'1'+'&'+'2'+';'); //all serial functions in context of myPort object
  console.log('normal white strobe');
  res.json(['normal white strobe']);
  currentPattern=3;
  currentColor=2;
})

app.post('/api/strobe/speed=2/color=0', (req, res) => {
  myPort.write('3'+','+'2'+'&'+'0'+';'); //all serial functions in context of myPort object
  console.log('fast blue strobe');
  res.json(['fast blue strobe']);
  currentPattern=3;
  currentColor=0;
})

app.post('/api/strobe/speed=2/color=1', (req, res) => {
  myPort.write('3'+','+'2'+'&'+'1'+';'); //all serial functions in context of myPort object
  console.log('fast red strobe');
  res.json(['fast red strobe']);
  currentPattern=3;
  currentColor=1;
})

app.post('/api/strobe/speed=2/color=2', (req, res) => {
  myPort.write('3'+','+'2'+'&'+'2'+';'); //all serial functions in context of myPort object
  console.log('fast white strobe');
  res.json(['fast white strobe']);
  currentPattern=3;
  currentColor=2;
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
