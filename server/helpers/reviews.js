const axios = require('axios');
const config = require('../../config.js');


// let getReviews = () => {
// 	var url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/';
// 	return axios ({
// 		method: 'get',
// 		url: url,
// 		headers: {
// 			'Authorization': `${config.API_KEY}`
// 		}
// 	})
// 	.catch(function(error){
// 		console.log('axios getReviews error!: ');
// 	});
// }



let getReviewsByID = (id) => {
	var url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/';
	return axios ({
		method: 'get',
		url: url,
		params: {
			sort: 'newest',
			product_id: id
		},
		headers: {
			'User-Agent': 'request',
			'Authorization': `${config.API_KEY}`
		}
	})
	.catch(function(error) {
		console.log('axios getReviewsByID error!: ', JSON.stringify(error).slice(0, 200));
	});
}

module.exports.getReviewsByID = getReviewsByID;