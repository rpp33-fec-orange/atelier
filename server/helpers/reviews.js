const axios = require('axios');
const config = require('../../config.js');


let getReviews = () => {
	var url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/';
	return axios ({
		method: 'get',
		url: url,
		headers: {
			'Authorization': `${config.API_KEY}`
		}
	})
	.then(function(success){
		console.log('axios GET to /reviews/ success!');
		return success;
	})
	.catch(function(error){
		console.log('axios error is: ', error);
	});
}

module.exports.getReviews = getReviews;