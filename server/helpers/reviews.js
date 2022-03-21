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



let getReviewsByID = (id, sort, count) => {
	var url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/';
	return axios ({
		method: 'get',
		url: url,
		params: {
			sort: sort,
			product_id: id,
			count: count
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

let postReview = (review) => {
	console.log('review in axios postReview in review.js: ', review);
	var dummyReview = {
		product_id: 64620,
		rating: 2,
		summary: 'testing if this works',
		body: 'Hate it it it',
		recommend: true,
		name: 'Goldlewis',
		email: 'nocountryfornoel@gmail.com',
		photos: [
			'https://d23.com/app/uploads/2019/06/1180w-600h_061819_tarzan-20th-anniversary.jpg'
		],
		characteristics: { '14': 4, '15': 4, '16': 3, '17': 2, '18': 1 }
	};
	var url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews';
	return axios ({
		method: 'POST',
		url: url,
		// contentType: 'application/json',
		// responseType: 'json',
		// params: {
		// 	product_id: 64620,
		// 	rating: 2,
		// 	summary: 'testing if this works',
		// 	body: 'Hate it it it',
		// 	recommend: true,
		// 	name: 'Goldlewis',
		// 	email: 'nocountryfornoel@gmail.com',
		// 	photos: [
		// 		'https://d23.com/app/uploads/2019/06/1180w-600h_061819_tarzan-20th-anniversary.jpg'
		// 	],
		// 	characteristics: { '14': 4, '15': 4, '16': 3, '17': 2, '18': 1 }
		// },

		data: JSON.stringify(dummyReview),
		// params: review,
		headers: {
			'User-Agent': 'request',
			'Authorization': `${options.auth.Authorization}`,
			'Content-Type': 'application/json;charset=UTF-8'
		}
		// headers: options.auth,
	})
	// .catch(function(error) {
	// 	console.log('axios postReview error!: ', JSON.stringify(error).slice(0, 1000));
	// });
}

let putReview = (review_id) => {
	var reviewID = review_id;
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

let putReviewReported = (review_id) => {
	var reviewID = review_id;
	var url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${reviewID}/report`;
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
		console.log('axios putReviewReported error!: ', JSON.stringify(error).slice(0, 200));
	});
}

module.exports = {
	getReviewsByID,
	getReviewsMeta,
	postReview,
	putReview,
	putReviewReported
};





//const getReviewsByID = require('./helpers/reviews.js').getReviewsByID;
