const axios = require('axios');
const config = require('../../config.js');

const getProducts = function () {
  return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products', { headers: { 'Authorization': config.API_KEY } })
    .then(success => {
      console.log('api axios GET success: ');
      return success.data;
    })
    .catch(error => {
      console.log('api axios GET error')
    })
};

module.exports.getProducts = getProducts;