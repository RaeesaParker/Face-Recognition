
// Branch => API Backend 

// ---------------------------------- //
// Including Packages			
// ---------------------------------- //


// Include Dotenv to load environments - will be used for APIs 
require('dotenv').config()

// To make GET request from backend 
const fetch = require('node-fetch')

// Framework
const express = require('express');

// Access File System
const fs = require('fs')

// Utilities - parsing and functions
const bodyParser = require('body-parser');
const lodash = require('lodash');

// Connecting back-end to front-end
const cors = require('cors')

// Used to create a session (cookies)
const session = require('express-session');


// Database
const postgres = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'raeesaparker',
    password : '',
    database : 'zeroToMasteryDB'
  }
});

// Authentification 
const bcrypt = require('bcrypt');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook');



// Import constrollers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const clarifai = require('./controllers/clarifai');






// -------------------------------------------------------

// Set up packages
const app = express();


// Set up CORS - connecting back-end to front-end
app.use(cors());



// Set up encoding and directory routes
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



// Use the public folder
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');



// Set up port - 5432 is for postgresql
const port = 4000;


// Listen to the server
app.listen(port, function(){
  console.log('Listening on port ' + port);
});





// ---------------------------------- //
// Constants and variables						
// ---------------------------------- //

// Salt Round for BCrypt
const saltRounds = 10;





// ---------------------------------- //
// Databases				
// ---------------------------------- //

// User: id , name , email , entries , joined

// Login : id , hash , e-mail , facebookid , googleid



// ---------------------------------- //
// Routing		 -     GET 				
// ---------------------------------- //


app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req, res, postgres)});










 // ---------------------------------- //
 // Routing	 		-     POST			
 // ---------------------------------- //

// Post for the sign in page 
app.post('/signin', (req, res) => {signin.handleSignin(req, res, postgres, bcrypt)})


// Post for registering a new user
app.post('/register', (req, res) => {register.handleRegister(req, res, postgres, bcrypt, saltRounds)})


// Post for carrying out the clarifai API call
app.post('/clarifai', (req, res) => {clarifai.handleClarifai(req, res, fetch)})




 // ---------------------------------- //
 // Routing	 		-     PUT			
 // ---------------------------------- //

app.put('/image', (req, res) => {image.handleImagePut(req, res, postgres)})














