const axios = require('axios');
const config = require('../../config.js');


let getReviews = () => {
	var url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/';
	// return axios ({
	// 	method: 'get',
	// 	url: url,
	// 	headers: {
	// 		'Authorization': `${config.API_KEY}`
	// 	}
	// })
	return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/64620', { headers: { 'Authorization': config.API_KEY } })
    .then(success => {
      console.log('api axios GET reviews success: ');
      return success.data;
    })
	.catch(function(error){
		console.log('axios getReviews error!: ');
	});
}



let getReviewsByID = (id) => {
	var url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/';
	// return axios ({
	// 	method: 'get',
	// 	url: url,
	// 	headers: {
	// 		'Authorization': `${config.API_KEY}`
	// 	}
	// })
	return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/', { headers: { 'Authorization': config.API_KEY } }, { params: { sort: 'newest', product_id: id } })
    .then(function(sucess) {
      console.log('api axios GET reviews success: ');
      return success.data;
    })
	.catch(function(error) {
		console.log('axios getReviewsByID error!: ', JSON.stringify(error).slice(0, 200));
	});
}

module.exports.getReviewsByID = getReviewsByID;