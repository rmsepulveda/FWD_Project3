// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Dependencies
//const bodyParser = require('body-parser'); ** not needed with express 4.16 and higher

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Post Route
app.post('/add', addInfo);

function addInfo(req, res) {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.content;
  //console.log(projectData);
  res.send(projectData);
}

// Callback function to complete GET '/all'
app.get('/all', getInfo);

function getInfo(req, res) {
  res.send(projectData);
}

// Setup Server

const port = 8080;
const server = app.listen(port, listening);

function listening() {
  console.log(`running on localhost: ${port}`);
};
