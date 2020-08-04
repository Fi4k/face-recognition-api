const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '9cc6ee4df17e434280d74f8852866558'
});

const handleApiCall = (req, res) => {
	app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)	
    .then(data => {
    	res.json(data);
    })
    .catch(err => res.status(400).json("Error with Api"))
}


const handleImage = (req, res, db) => {
	const {id} = req.body;
	let found = false;

	db("users").where("id", "=", id)
	.increment("entries", 1)
	.returning("entries")
	.then(entries => {
		// const x = {id: entries[0]}
		// console.log(entries[0]);
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json("Unable to get entries"))
}

module.exports = {
	handleImage,
	handleApiCall
}