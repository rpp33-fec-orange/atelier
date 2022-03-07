const axios = require('axios');
const { options } = require('./options.js');


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
			'Authorization': `${options.auth.Authorization}`
		}
	})
	.catch(function(error) {
		console.log('axios getReviewsByID error!: ', JSON.stringify(error).slice(0, 200));
	});
}

let getReviewsMeta = (id) => {
	var url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta';
	return axios ({
		method: 'get',
		url: url,
		params: {
			product_id: id
		},
		headers: {
			'User-Agent': 'request',
			'Authorization': `${options.auth.Authorization}`
		}
	})
	.catch(function(error) {
		console.log('axios getReviewsMeta error!: ', JSON.stringify(error).slice(0, 200));
	});
}

let postReview = (product_id, rating, summary, body, recommend, name, email, photos, characteristics) => {
	var url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews';
	return axios ({
		method: 'post',
		url: url,
		params: {
			product_id: product_id,
			rating: rating,
			summary: summary,
			body: body,
			recommend: recommend,
			name: name,
			email: email,
			photos: photos,
			characteristics: characteristics
		},
		headers: {
			'User-Agent': 'request',
			'Authorization': `${options.auth.Authorization}`
		}
	})
	.catch(function(error) {
		console.log('axios postReview error!: ', JSON.stringify(error).slice(0, 200));
	});
}

let putReview = (review_id) => {
	var reviewID = review_id
	var url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${reviewID}/helpful`;
	return axios ({
		method: 'PUT',
		url: url,
		params: {
			review_id: review_id
		},
		headers: {
			'User-Agent': 'request',
			'Authorization': `${options.auth.Authorization}`
		}
	})
	.catch(function(error) {
		console.log('axios putReview error!: ', JSON.stringify(error).slice(0, 200));
	});
}

module.exports = {
	getReviewsByID,
	getReviewsMeta,
	postReview,
	putReview
};





//const getReviewsByID = require('./helpers/reviews.js').getReviewsByID;
