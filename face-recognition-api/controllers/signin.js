


const handleSignin = (req, res, postgres, bcrypt) => {

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
}



module.exports = {
	handleSignin : handleSignin
}




