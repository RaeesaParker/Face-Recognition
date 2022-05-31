 // ---------------------------------- //
 // Including Packages			
 // ---------------------------------- //

// Framework
const express = require('express');
// Access File System
const fs = require('fs')
// Utilities - parsing and functions
const bodyParser = require('body-parser');
const lodash = require('lodash');
// Connecting back-end to front-end
const cors = require('cors')
// Database
const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
// Used to create a session (cookies)
const session = require('express-session');
// Authentification 
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook');




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





// Set up port
const port = 4000;


// Listen to the server
app.listen(port, function(){
  console.log('Listening on port ' + port);
});





 // ---------------------------------- //
 // Constants and variables						
 // ---------------------------------- //

const database = {
	users : [
		{
			id : '1',
			name: 'Raeesa', 
			email: 'riisaparker@gmail.com',
			password: 'watermelon',
			entries: 0, 
			joined: new Date()
		},
		{
			id : '2',
			name: 'Ahmad', 
			email: 'ahmadRustam@gmail.com',
			password: 'blueberries',
			entries: 0, 
			joined: new Date()
		}
	]
}




 // ---------------------------------- //
 // Routing		 -     GET 				
 // ---------------------------------- //




app.get('/', (req,res) => {
	res.json( database.users);
});


app.get('/signin', (req,res) => {
	res.json('Hello - This is the SIGNIN page');
});




app.get('/profile/:id', (req,res) => {

	const { id } = req.params;
	
	let found = false;

	database.users.forEach(user => {
		if (user.id === id) {
			console.log(user.id, id)
			found = true;
			res.json(user);
		}
	})
	if (!found) {
		res.status(400).json('User not found');
	}
});




 // ---------------------------------- //
 // Routing	 		-     POST			
 // ---------------------------------- //



// Post for the sign in page 

app.post('/signin', (req,res) => {
	if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
		res.json(database.users[0]);
	} else{
		res.status(400).json('Error loggin in');
	}
})





app.post('/register', (req,res) => {

	const {email, password, name} = req.body;

	database.users.push({
		id : '3',
		name: name, 
		email: email,
		password: password,
		entries: 0, 
		joined: new Date()
	})
	res.json(database.users[database.users.length - 1]);
})





 // ---------------------------------- //
 // Routing	 		-     PUT			
 // ---------------------------------- //

app.put('/image', (req,res) => {

const { id } = req.body;
	
	let found = false;

	database.users.forEach(user => {
		if (user.id === id) {
			found = true
			user.entries++
			res.json(user.entries);
		}
	})
	if (!found) {
		res.status(400).json('User not found');
	}

})

















