const axios = require('axios');
const config = require('../../config.js');

const addToCart = function (cartItem) {
  return axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/cart', { headers: { 'Authorization': config.API_KEY } })
    .then(success => {
      console.log('api addToCart GET success: ');
    })
    .catch(error => {
      console.log('api addToCart GET error')
    })
};

const getCart = function () {
  return axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/cart', { headers: { 'Authorization': config.API_KEY } })
    .then(success => {
      console.log('api getCart GET success: ');
      return success.data;
    })
    .catch(error => {
      console.log('api getCart GET error')
    })
};

module.exports = { addToCart, getCart };