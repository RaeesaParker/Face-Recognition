


const handleRegister = (req,res, postgres, bcrypt, saltRounds) => {

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
}


module.exports = {
	handleRegister : handleRegister
}

