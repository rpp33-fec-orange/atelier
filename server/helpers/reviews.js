const axios = require('axios');
const config = require('../config.js');
const express = require('express');
let app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));

let getReviews = (reviews) => {
	var url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews';
	return axios ({
		method: 'get',
		url: url,
		headers: {
			'Authorization': `token ${config.API_KEY}`
		}
	})
	.catch(function(error) => {
		console.log('axios error is: ', String)
	});
}

app.get('/reviews/', function(req, res) {
	getReviews()
		.then((data) => {
			console.log('getting reviews success!');
			console.log('reviews are: ', data);
			res.status(200).send(data);
		})
		.catch((error) => {
			console.log('error getting reviews!');
		})
});

let port = 2000;
app.listen(port, function () {
	console.log(`listening on port ${port}`);
});


module.exports.getReviews = getReviews;