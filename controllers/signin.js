const handleSignin = (req, res, db, bcrypt) => {

	// console.log(req.body.email);
	const {email, password} = req.body;
	if(!email || !password){
		return res.status(400).json("Incorrect Form Submission!");
	}

	db.select("email", "hash")
	.from("login")
	.where("email", "=", email)
	.then(data => {
		const isValid = bcrypt.compareSync(password, data[0].hash);

		if(isValid) {
			return db.select("*").from("users")
			.where("email", "=", email)
			.then(user => {
				res.json(user[0])
			})
			.catch(err => res.status(400).json("Unable to getElementBy user"))
		} else {
			res.status(400).json("Wrong credentials");
		}

	})
	.catch(err => res.status(400).json("Wrong credentials"))
	// res.json("signin");
	// bcrypt.compare("1111", "$2a$10$R/OCI8XhD78aro9OdgwFPOd.HBoALkTIn/pAQRPyzqZniOQ5CguTq", function(err, res) {
		// console.log(res);
	// });
	// bcrypt.compare("1121", "$2a$10$R/OCI8XhD78aro9OdgwFPOd.HBoALkTIn/pAQRPyzqZniOQ5CguTq", function(err, res) {
		// console.lo	g(res);
	// });

// 	if(req.body.email === database.users[0].email &&
// 		req.body.password === database.users[0].password){
// 		res.json("signin successful")
// } else {
// 	res.status(400).json("error signing in!")
// }
}

module.exports = {
	handleSignin: handleSignin
};