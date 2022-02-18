const axios = require('axios');
const config = require('../../config.js');


let getReviews = (reviews) => {
	var url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews';
	return axios ({
		method: 'get',
		url: url,
		headers: {
			'Authorization': `token ${config.API_KEY}`
		}
	})
	.catch(function(error){
		console.log('axios error is: ', String)
	});
}

module.exports.getReviews = getReviews;