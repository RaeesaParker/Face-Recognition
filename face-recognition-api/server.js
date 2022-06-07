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




// app.get('/', (req,res) => {
// 	console.log('At app.get')
// 	res.json();
// });


// app.get('/signin', (req,res) => {
// 	res.json('Hello - This is the SIGNIN page');
// });




app.get('/profile/:id', (req,res) => {

	const { id } = req.params;
	
	postgres.select('*').from('users')
		.where({id: id})
		.then(user => {
			if (user.length){
				res.json(user[0])
			}else{
				res.status(400).json('User not found');
			}
		})
});






 // ---------------------------------- //
 // Routing	 		-     POST			
 // ---------------------------------- //



// Post for the sign in page 

app.post('/signin', (req,res) => {

	const {email, password} = req.body;

	// Get the login details of the user
	postgres.select('email', 'hash').from('login')
		.where('email', '=', email)
		
		// Decrypt the password
		.then(data => {
			bcrypt.compare(password, data[0].hash, function(err, result) {

				// Respond with users details if password correct
				if (result){
					postgres.select('*').from('users')
						.where('email', '=', email)

						.then(user => {
							res.json(user[0])
						})
						.catch(err => {
							res.status(400).json('Unable to get user')
						})
				// Else send wrong credentials
				}else{
					
						res.status(400).json('Wrong Credentials')
				
				}
			})
		})
		// Send an error if anything else goes wrong
		.catch(err => {
			res.status(400).json('Wrong Credentials')
		})
})




// Post for registering a new user

app.post('/register', (req,res) => {

	const {email, password, name} = req.body;


	// Check if the user is already registered

	postgres('users').count('*').where('email', email)
		.then(response => {
			const count = response[0].count
			return count
		})
		// If they are registered, return that they are registered
		.then(count =>{
			if (count == 1){
				res.status(400).json('User already registered')
			}else{
				// Salt and Hash Password
				bcrypt.hash(password, saltRounds, function(err, hash) {
				    
				  // Perform a transaction so we can update both the user database and the login database 
					postgres.transaction(trx => {

						// Insert into login and hash password
						trx.insert({
							hash : hash, 
							email : email
						})
						.into('login')
						.returning('email')

						// Insert into users
						.then(loginEmail => {
							trx('users')
							.returning('*')
							.insert({
								email: loginEmail[0].email,
								name: name, 
								joined: new Date()
							})
							.then(user => { 
								res.json(user[0]);
							})
						})

						// Commit the changes and catch any errors
						.then(trx.commit)
						.catch(trx.rollback)
					})

					// Catch any errors
					.catch(err => {
						res.status(400).json('Unable to Register')
					})
				});
			}
		})
})





 // ---------------------------------- //
 // Routing	 		-     PUT			
 // ---------------------------------- //

app.put('/image', (req,res) => {

const { id } = req.body;
	
	postgres('users')
	  .where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0].entries)
		})
		.catch(err => {
			res.status(400).json('Unable to get entries')
		})

})














